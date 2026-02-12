import { JwtService } from '@nestjs/jwt';

export const generateToken = (jwtService: JwtService, payload: any) => {
    const access_token = jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
    });
    const refresh_token = jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
    });
    return { access_token, refresh_token };
}