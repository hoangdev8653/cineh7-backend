import { Module } from '@nestjs/common';
import { NewsEventsController } from './news-events.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [NewsEventsController],
})
export class NewsEventsModule { }
