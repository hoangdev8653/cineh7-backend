import { Controller, Get, Post, Body, Param, Delete, Put, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoomDto, UpdateRoomDto, ROOM_CMD } from "@libs/common";

@Controller('room')
export class RoomController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Post()
    createRoom(@Body() createRoomDto: CreateRoomDto) {
        return this.client.send({ cmd: ROOM_CMD.CREATE }, createRoomDto);
    }

    @Get()
    getAllRooms() {
        return this.client.send({ cmd: ROOM_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getRoomById(@Param('id') id: string) {
        return this.client.send({ cmd: ROOM_CMD.GET_BY_ID }, id);
    }

    @Put(':id')
    updateRoom(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        return this.client.send({ cmd: ROOM_CMD.UPDATE }, { id, updateRoomDto });
    }

    @Delete(':id')
    deleteRoom(@Param('id') id: string) {
        return this.client.send({ cmd: ROOM_CMD.DELETE }, id);
    }
}
