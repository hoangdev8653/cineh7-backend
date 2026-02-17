import { Controller, Get } from '@nestjs/common';
import { Cineh7BookingService } from './app.service';

@Controller()
export class Cineh7BookingServiceController {
  constructor(private readonly cineh7BookingService: Cineh7BookingService) { }

  @Get()
  getHello(): string {
    return this.cineh7BookingService.getHello();
  }
}
