import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'BOOKING_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>('BOOKING_SERVICE_HOST', 'localhost'),
                        port: configService.get<number>('BOOKING_SERVICE_PORT', 3003),
                    },
                }),
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class BookingSharedModule { }
