import { Module } from '@nestjs/common';
import { Cineh7BookingServiceController } from './app.controller';
import { Cineh7BookingService } from './app.service';
import { OrderModule } from "../src/modules/orders/order.module"
import { TicketModule } from "../src/modules/tickets/ticket.module"
import { ScheduleModule as CronModule } from "../src/modules/schedule/schedule.module"
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectDbBooking } from './configs/database.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync(ConnectDbBooking),
    OrderModule,
    TicketModule,
    CronModule,
  ],
  controllers: [Cineh7BookingServiceController],
  providers: [Cineh7BookingService],
})
export class Cineh7BookingServiceModule { }
