import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const generateToken = (jwtService: JwtService, configService: ConfigService, payload: any) => {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('DEBUG: Signing token with secret:', secret);
    const access_token = jwtService.sign(payload, {
        secret,
        expiresIn: '1h',
    });
    const refresh_token = jwtService.sign(payload, {
        secret,
        expiresIn: '7d',
    });
    return { access_token, refresh_token };
}