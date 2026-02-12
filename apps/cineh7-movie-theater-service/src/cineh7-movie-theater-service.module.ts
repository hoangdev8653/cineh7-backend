import { Module } from '@nestjs/common';
import { Cineh7MovieTheaterServiceController } from './cineh7-movie-theater-service.controller';
import { Cineh7MovieTheaterServiceService } from './cineh7-movie-theater-service.service';

@Module({
  imports: [],
  controllers: [Cineh7MovieTheaterServiceController],
  providers: [Cineh7MovieTheaterServiceService],
})
export class Cineh7MovieTheaterServiceModule {}
