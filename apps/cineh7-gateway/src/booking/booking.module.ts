import { Module } from '@nestjs/common';
import { OrderModule } from './orders/order.module';
import { TicketModule } from './tickets/ticket.module';
import { BookingSharedModule } from './booking-shared.module';

@Module({
    imports: [
        BookingSharedModule,
        OrderModule,
        TicketModule,
    ],
    exports: [BookingSharedModule, OrderModule, TicketModule],
})
export class BookingModule { }
