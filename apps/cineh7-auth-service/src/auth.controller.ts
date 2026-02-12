import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, PaginationDto, ChangePasswordDto, ForgotPasswordDto, LogoutDto, ResetPasswordDto, UpdateRoleDto } from './auth.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRole } from './auth.entities';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(loginDto);
    response.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return result;
  }

  @Get("google")
  @UseGuards(AuthGuard('google'))
  async googleLogin() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.googleLogin(req.user);
    response.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return result;
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("profile")
  async profile(@Req() req: any) {
    const userId = req.user.id;
    const result = await this.authService.profile(userId);
    return result;
  }

  @Post("logout")
  async logout(@Body() logoutDto: LogoutDto) {
    const result = await this.authService.logout(logoutDto);
    return result;
  }

  @Post("refresh-token")
  async refreshToken(@Req() request: Request) {
    const token = request.cookies['refresh_token'] as string;
    if (!token) {
      throw new UnauthorizedException('Refresh token not found');
    }
    const { access_token, refresh_token } = await this.authService.refreshToken(token);
    return { access_token, refresh_token };
  }

  @Post("forgot-password")
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return result;
  }

  @Post("reset-password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return result;
  }

  @Post("change-password")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const result = await this.authService.changePassword(changePasswordDto);
    return result;
  }

  @Get("users")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllUsers(@Query() query: PaginationDto) {
    const result = await this.authService.getAllUsers(query);
    return result;
  }

  @Patch("update-role")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    const result = await this.authService.updateRole(updateRoleDto.id, updateRoleDto.role);
    return result;
  }

  @Patch("lock/:id")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async lockUser(@Param("id") id: string) {
    const result = await this.authService.lockUser(id);
    return result;
  }

  @Patch("unlock/:id")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async unlockUser(@Param("id") id: string) {
    const result = await this.authService.unlockUser(id);
    return result;
  }




  @Delete("delete/:id")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param("id") id: string) {
    const result = await this.authService.deleteUser(id);
    return result;
  }


}
