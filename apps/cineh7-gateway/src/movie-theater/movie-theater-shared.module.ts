// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//     imports: [
//         ClientsModule.registerAsync([
//             {
//                 name: 'MOVIE_THEATER_SERVICE',
//                 imports: [ConfigModule],
//                 inject: [ConfigService],
//                 useFactory: (configService: ConfigService) => ({
//                     transport: Transport.TCP,
//                     options: {
//                         host: configService.get<string>('MOVIE_THEATER_SERVICE_HOST', 'localhost'),
//                         port: configService.get<number>('MOVIE_THEATER_SERVICE_PORT', 3002),
//                     },
//                 }),
//             },
//         ]),
//     ],
//     exports: [ClientsModule],
// })
// export class MovieTheaterSharedModule { }

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'MOVIE_THEATER_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>('MOVIE_THEATER_SERVICE_HOST', 'localhost'),
                        port: configService.get<number>('MOVIE_THEATER_SERVICE_PORT', 3002),
                    },
                }),
            },
            // THÊM ĐOẠN NÀY VÀO ĐÂY
            {
                name: 'BOOKING_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP, // Hoặc Transport.REDIS nếu Booking dùng Redis
                    options: {
                        host: configService.get<string>('BOOKING_SERVICE_HOST', 'localhost'),
                        port: configService.get<number>('BOOKING_SERVICE_PORT', 3003), // Đảm bảo port này đúng với Booking Service
                    },
                }),
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class MovieTheaterSharedModule { }