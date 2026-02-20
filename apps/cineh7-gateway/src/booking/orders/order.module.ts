import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { BookingSharedModule } from '../booking-shared.module';

@Module({
    imports: [BookingSharedModule],
    controllers: [OrderController],
})
export class OrderModule { }
