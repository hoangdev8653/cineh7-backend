import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET', 'secret');
        console.log('JwtStrategy Secret:', secret);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        console.log('JwtStrategy Payload:', payload);
        // payload comes from the decoded JWT
        // In Auth Service generateToken: { email: user.email, sub: user.id }
        return { userId: payload.sub, email: payload.email };
    }
}
