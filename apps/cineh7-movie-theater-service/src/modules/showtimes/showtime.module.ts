import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from './showtime.entities';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { Movie } from '../movies/movie.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Showtime, Movie])],
    controllers: [ShowtimeController],
    providers: [ShowtimeService],
})
export class ShowtimeModule { }
