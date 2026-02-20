import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [TheaterController],
})
export class TheaterModule { }
