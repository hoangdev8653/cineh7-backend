import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';
import { CloudinaryModule } from '@libs/cloudinary';

@Module({
    imports: [MovieTheaterSharedModule, CloudinaryModule],
    controllers: [MovieController],
})
export class MovieModule { }
