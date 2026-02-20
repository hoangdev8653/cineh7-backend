import { Module } from '@nestjs/common';
import { SeatController } from './seat.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [SeatController],
})
export class SeatModule { }
