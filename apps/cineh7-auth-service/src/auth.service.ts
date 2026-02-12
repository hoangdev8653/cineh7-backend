import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto, PaginationDto, ChangePasswordDto, ForgotPasswordDto, LogoutDto, ResetPasswordDto } from './auth.dto';
import { User, UserRole } from "./auth.entities"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt"
import { MailService } from './configs/mail.config';
import { generateToken } from './configs/generateToken.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { access_token, refresh_token } = generateToken(this.jwtService, { email: user.email, sub: user.id });
    await this.authRepository.update(user.id, { refresh_token });

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        avatar: user.avatar
      },
      access_token,
      refresh_token,
    };
  }
  async register(registerDto: RegisterDto) {
    const { email, password, full_name, avatar } = registerDto;
    const existingUser = await this.authRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.authRepository.create({
      email,
      password: hashedPassword,
      full_name,
      avatar,
    });
    const savedUser = await this.authRepository.save(user);
    return savedUser;
  }

  async logout(logoutDto: LogoutDto) {
    const { refresh_token } = logoutDto;
    try {
      const payload = this.jwtService.decode(refresh_token) as any;
      if (payload?.sub) {
        await this.authRepository.update(payload.sub, { refresh_token: null });
      }
    } catch (e) { }

    return { message: 'Logged out successfully' };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.authRepository.findOne({ where: { id: payload.sub } });

      if (!user || user.refresh_token !== token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { access_token, refresh_token } = generateToken(this.jwtService, { email: user.email, sub: user.id });
      await this.authRepository.update(user.id, { refresh_token });

      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async profile(id: string) {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      avatar: user.avatar
    };
  }

  async getAllUsers(paginationDto: PaginationDto) {
    const page = Number(paginationDto.page) || 1;
    const limit = Number(paginationDto.limit) || 10;
    const skip = (page - 1) * limit;

    const [result, total] = await this.authRepository.findAndCount({
      skip,
      take: limit,
      order: { created_at: 'DESC' }
    });
    return {
      data: result.map(user => ({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        avatar: user.avatar,
        is_active: user.is_active,
        auth_method: user.auth_method
      })),
      total,
      page,
      limit,
      last_page: Math.ceil(total / limit)
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    // Implement logic
    return { message: "Password changed" }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    // Implement logic
    return { message: "Reset email sent" }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    // Implement logic
    return { message: "Password reset" }
  }
  async googleLogin(profile: any) {
    const email = profile.emails[0].value;
    const full_name = profile.displayName;
    const avatar = profile.photos[0].value;

    let user = await this.authRepository.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      user = this.authRepository.create({
        email,
        full_name,
        avatar,
        auth_method: 'EMAIL',
        password: '',
      });
      await this.authRepository.save(user);
    } else {
      this.mailService.sendMail(user.email, 'Google Login', 'You have successfully logged in using Google');
      if (avatar) {
        await this.authRepository.update(user.id, { avatar });
      }
    }

    const { access_token, refresh_token } = generateToken(this.jwtService, { email: user.email, sub: user.id });
    await this.authRepository.update(user.id, { refresh_token });

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        avatar: user.avatar
      },
      access_token,
      refresh_token,
    };
  }

  async updateRole(id: string, role: UserRole) {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const updatedUser = await this.authRepository.update(id, { role });
    return updatedUser;
  }

  async lockUser(id: string) {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const updatedUser = await this.authRepository.update(id, { is_active: false });
    return updatedUser;
  }

  async unlockUser(id: string) {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const updatedUser = await this.authRepository.update(id, { is_active: true });
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const deletedUser = await this.authRepository.delete(id);
    return deletedUser;
  }
}
