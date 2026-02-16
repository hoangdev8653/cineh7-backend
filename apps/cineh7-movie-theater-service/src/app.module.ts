import { Module } from '@nestjs/common';
import { CloudinaryModule } from '@libs/cloudinary';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectDbMovieTheater } from './configs/database.config';
import { TheaterSystemModule } from './modules/theater-systems/theater-system.module';
import { TheaterModule } from './modules/theaters/theater.module';
import { MovieModule } from './modules/movies/movie.module';
import { ShowtimeModule } from './modules/showtimes/showtime.module';
import { RoomModule } from './modules/rooms/room.module';
import { SeatModule } from './modules/seats/seat.module';
import { NewsEventsModule } from './modules/news-events/new-event.module';
import { MovieTheaterServiceController } from './app.controller';
import { MovieTheaterServiceService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(ConnectDbMovieTheater),
    TheaterSystemModule,
    TheaterModule,
    MovieModule,
    ShowtimeModule,
    RoomModule,
    SeatModule,
    NewsEventsModule,
    CloudinaryModule,
  ],
  controllers: [MovieTheaterServiceController],
  providers: [MovieTheaterServiceService],
})
export class MovieTheaterServiceModule { }
