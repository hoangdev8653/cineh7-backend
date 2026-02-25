import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TicketModule } from '../tickets/ticket.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        TicketModule,
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
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule { }
