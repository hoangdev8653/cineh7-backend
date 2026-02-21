import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayAuthController } from './auth.controller';

@Module({
    imports: [
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
    providers: [],
})
export class AuthModule { }
