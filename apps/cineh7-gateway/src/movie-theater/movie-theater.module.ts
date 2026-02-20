import { Module } from '@nestjs/common';
import { MovieModule } from './movies/movie.module';
import { NewsEventsModule } from './news-events/news-events.module';
import { RoomModule } from './rooms/room.module';
import { SeatModule } from './seats/seat.module';
import { ShowtimeModule } from './showtimes/showtime.module';
import { TheaterSystemModule } from './theater-systems/theater-system.module';
import { TheaterModule } from './theaters/theater.module';
import { MovieTheaterSharedModule } from './movie-theater-shared.module';

@Module({
    imports: [
        MovieTheaterSharedModule,
        MovieModule,
        NewsEventsModule,
        RoomModule,
        SeatModule,
        ShowtimeModule,
        TheaterSystemModule,
        TheaterModule,
    ],
    exports: [MovieTheaterSharedModule, MovieModule, NewsEventsModule, RoomModule, SeatModule, ShowtimeModule, TheaterSystemModule, TheaterModule],
})
export class MovieTheaterModule { }
