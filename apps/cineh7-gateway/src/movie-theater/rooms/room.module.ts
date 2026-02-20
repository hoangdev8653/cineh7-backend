import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { MovieTheaterSharedModule } from '../movie-theater-shared.module';

@Module({
    imports: [MovieTheaterSharedModule],
    controllers: [RoomController],
})
export class RoomModule { }
