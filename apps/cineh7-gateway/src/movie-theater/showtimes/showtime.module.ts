import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtime.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [ShowtimeController],
})
export class ShowtimeModule { }
