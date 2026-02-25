import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GatewayAuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET', 'secret'),
                signOptions: { expiresIn: '15m' },
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: 'AUTH_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>('AUTH_SERVICE_HOST', 'localhost'),
                        port: configService.get<number>('AUTH_SERVICE_PORT', 3001),
                    },
                }),
            },
        ]),
    ],
    controllers: [GatewayAuthController],
    providers: [JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
