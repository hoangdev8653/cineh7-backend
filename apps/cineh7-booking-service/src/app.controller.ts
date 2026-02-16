import { Controller, Get } from '@nestjs/common';
import { Cineh7BookingServiceService } from './app.service';

@Controller()
export class Cineh7BookingServiceController {
  constructor(private readonly cineh7BookingServiceService: Cineh7BookingServiceService) { }

  @Get()
  getHello(): string {
    return this.cineh7BookingServiceService.getHello();
  }
}
