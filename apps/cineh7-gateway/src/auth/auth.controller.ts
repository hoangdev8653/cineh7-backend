import { Body, Controller, Inject, Post, Res, Get, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AUTH_CMD, LoginDto, RegisterDto } from '@libs/common';

@Controller('auth')
export class GatewayAuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    ) { }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await firstValueFrom(
            this.authService.send({ cmd: AUTH_CMD.LOGIN }, loginDto),
        );

        if (result && result.refresh_token) {
            response.cookie('refresh_token', result.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }

        return result;
    }


    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.send({ cmd: AUTH_CMD.REGISTER }, registerDto);
    }

    @Post('logout')
    async logout(@Body() body: { refresh_token: string }) {
        return this.authService.send({ cmd: AUTH_CMD.LOGOUT }, body);
    }

    @Post('refresh-token')
    async refreshToken(@Body() body: { refresh_token: string }) {
        return this.authService.send({ cmd: AUTH_CMD.REFRESH_TOKEN }, body.refresh_token);
    }

    @Get('profile')
    // @UseGuards(AuthGuard) // TODO: Add Gateway Auth Guard
    async profile(@Query() query: { id: string }) { // In real app, id comes from JWT in request
        return this.authService.send({ cmd: AUTH_CMD.PROFILE }, query.id);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: any) {
        return this.authService.send({ cmd: AUTH_CMD.FORGOT_PASSWORD }, body);
    }

    @Post('reset-password')
    async resetPassword(@Body() body: any) {
        return this.authService.send({ cmd: AUTH_CMD.RESET_PASSWORD }, body);
    }

    @Post('change-password')
    async changePassword(@Body() body: any) {
        return this.authService.send({ cmd: AUTH_CMD.CHANGE_PASSWORD }, body);
    }


    // Admin endpoints
    @Get('users')
    async getAllUsers(@Query() query: any) {
        return this.authService.send({ cmd: AUTH_CMD.GET_ALL_USERS }, query);
    }

    @Post('update-role')
    async updateRole(@Body() body: any) {
        return this.authService.send({ cmd: AUTH_CMD.UPDATE_ROLE }, body);
    }

    @Post('lock-user')
    async lockUser(@Body() body: { id: string }) {
        return this.authService.send({ cmd: AUTH_CMD.LOCK_USER }, body.id);
    }

    @Post('unlock-user')
    async unlockUser(@Body() body: { id: string }) {
        return this.authService.send({ cmd: AUTH_CMD.UNLOCK_USER }, body.id);
    }

    @Post('delete-user')
    async deleteUser(@Body() body: { id: string }) {
        return this.authService.send({ cmd: AUTH_CMD.DELETE_USER }, body.id);
    }
}
