import { Controller, Get } from '@nestjs/common';
import { Cineh7MovieTheaterServiceService } from './cineh7-movie-theater-service.service';

@Controller()
export class Cineh7MovieTheaterServiceController {
  constructor(private readonly cineh7MovieTheaterServiceService: Cineh7MovieTheaterServiceService) {}

  @Get()
  getHello(): string {
    return this.cineh7MovieTheaterServiceService.getHello();
  }
}
