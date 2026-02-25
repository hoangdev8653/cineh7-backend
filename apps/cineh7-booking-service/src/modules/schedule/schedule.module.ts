import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './schedule.service';
import { Order } from '../orders/order.entities';
import { Ticket } from '../tickets/ticket.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Ticket])],
    providers: [TasksService],
    exports: [TasksService],
})
export class ScheduleModule { }
