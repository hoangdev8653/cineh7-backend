import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { BookingSharedModule } from '../booking-shared.module';

@Module({
    imports: [BookingSharedModule],
    controllers: [TicketController],
})
export class TicketModule { }
