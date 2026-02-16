import { Module } from '@nestjs/common';
import { Cineh7BookingServiceController } from './app.controller';
import { Cineh7BookingServiceService } from './app.service';

@Module({
  imports: [],
  controllers: [Cineh7BookingServiceController],
  providers: [Cineh7BookingServiceService],
})
export class Cineh7BookingServiceModule { }
