import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEventsService } from './new-event.service';
import { NewsEventsController } from './new-event.controller';
import { NewsEvent } from './new-event.entities';

@Module({
    imports: [TypeOrmModule.forFeature([NewsEvent])],
    controllers: [NewsEventsController],
    providers: [NewsEventsService],
    exports: [NewsEventsService],
})
export class NewsEventsModule { }
