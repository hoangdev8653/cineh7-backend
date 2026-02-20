import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [MovieController],
})
export class MovieModule { }
