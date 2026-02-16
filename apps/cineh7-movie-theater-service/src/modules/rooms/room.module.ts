import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entities';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Room])],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [TypeOrmModule]
})
export class RoomModule { }
