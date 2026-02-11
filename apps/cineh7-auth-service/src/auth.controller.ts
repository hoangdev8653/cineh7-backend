import { Body, Controller, Get, Post, Query, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, PaginationDto, ChangePasswordDto, ForgotPasswordDto, LogoutDto, ProfileDto, ResetPasswordDto } from './auth.dto';
import type { Request, Response } from 'express';

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

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return result;
  }

  @Get("profile")
  async profile(@Body() profileDto: ProfileDto) {
    const result = await this.authService.profile(profileDto);
    return result;
  }

  @Post("logout")
  async logout(@Body() logoutDto: LogoutDto) {
    const result = await this.authService.logout(logoutDto);
    return result;
  }

  @Post("refresh-token")
  async refreshToken(@Req() request: Request) {
    const refresh_token = request.cookies['refresh_token'] as string;
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found');
    }
    const { access_token } = await this.authService.refreshToken(refresh_token);
    return { access_token };
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
  async getAllUsers(@Query() query: PaginationDto) {
    const result = await this.authService.getAllUsers(query);
    return result;
  }
}
