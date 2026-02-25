import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            console.log('--- JwtAuthGuard Debug ---');
            console.log('Error:', err);
            console.log('Info:', info);
            console.log('User:', user);
            console.log('---------------------------');
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
