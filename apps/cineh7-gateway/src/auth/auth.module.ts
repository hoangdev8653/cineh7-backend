import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayAuthController } from './auth.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 3001,
                },
            },
        ]),
    ],
    controllers: [GatewayAuthController],
    providers: [],
})
export class AuthModule { }
