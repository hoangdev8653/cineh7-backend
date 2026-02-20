import { Module } from '@nestjs/common';
import { TheaterSystemController } from './theater-system.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [TheaterSystemController],
})
export class TheaterSystemModule { }
