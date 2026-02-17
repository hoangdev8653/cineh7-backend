import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TicketModule } from '../tickets/ticket.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order]), TicketModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule { }
