import { Controller, Get } from '@nestjs/common';
import { MovieTheaterServiceService } from './app.service';

@Controller()
export class MovieTheaterServiceController {
  constructor(private readonly movieTheaterServiceService: MovieTheaterServiceService) { }

  @Get()
  getHello(): string {
    return this.movieTheaterServiceService.getHello();
  }
}
