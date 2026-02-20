import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_CMD, LoginDto, RegisterDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto, LogoutDto, PaginationDto, UpdateRoleDto } from '@libs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: AUTH_CMD.LOGIN })
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern({ cmd: AUTH_CMD.REGISTER })
  async register(registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }


  @MessagePattern({ cmd: AUTH_CMD.LOGOUT })
  async logout(logoutDto: LogoutDto) { // Using any for now as DTO is in common but checking service signature
    return this.authService.logout(logoutDto);
  }

  @MessagePattern({ cmd: AUTH_CMD.REFRESH_TOKEN })
  async refreshToken(token: string) {
    return this.authService.refreshToken(token);
  }

  @MessagePattern({ cmd: AUTH_CMD.PROFILE })
  async profile(id: string) {
    return this.authService.profile(id);
  }

  @MessagePattern({ cmd: AUTH_CMD.FORGOT_PASSWORD })
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @MessagePattern({ cmd: AUTH_CMD.RESET_PASSWORD })
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @MessagePattern({ cmd: AUTH_CMD.CHANGE_PASSWORD })
  async changePassword(changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @MessagePattern({ cmd: AUTH_CMD.GET_ALL_USERS })
  async getAllUsers(paginationDto: PaginationDto) {
    return this.authService.getAllUsers(paginationDto);
  }

  @MessagePattern({ cmd: AUTH_CMD.UPDATE_ROLE })
  async updateRole(data: { id: string, role: any }) {
    return this.authService.updateRole(data.id, data.role);
  }

  @MessagePattern({ cmd: AUTH_CMD.LOCK_USER })
  async lockUser(id: string) {
    return this.authService.lockUser(id);
  }

  @MessagePattern({ cmd: AUTH_CMD.UNLOCK_USER })
  async unlockUser(id: string) {
    return this.authService.unlockUser(id);
  }

  @MessagePattern({ cmd: AUTH_CMD.DELETE_USER })
  async deleteUser(id: string) {
    return this.authService.deleteUser(id);
  }
}



