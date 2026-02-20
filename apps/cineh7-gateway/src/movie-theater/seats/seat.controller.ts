import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSeatDto, UpdateSeatDto, SEAT_CMD } from "@libs/common";

@Controller('seat')
export class SeatController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Post()
    createSeatsMap(@Body() createSeatDto: CreateSeatDto) {
        return this.client.send({ cmd: SEAT_CMD.CREATE }, createSeatDto);
    }

    @Put('bulk/update-row')
    updateSeatsTypeByRow(@Body() body: { room_id: string, row: string, type: string }) {
        return this.client.send({ cmd: 'bulk_update_row' }, body);
    }

    @Get()
    getAllSeats() {
        return this.client.send({ cmd: SEAT_CMD.GET_ALL }, {});
    }

    @Get('room/:room_id')
    getSeatsByRoomId(@Param('room_id') room_id: string) {
        return this.client.send({ cmd: 'get_seats_by_room' }, room_id);
    }

    @Get(':id')
    getSeatById(@Param('id') id: string) {
        return this.client.send({ cmd: SEAT_CMD.GET_BY_ID }, id);
    }

    @Put(':id')
    updateSeat(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
        return this.client.send({ cmd: SEAT_CMD.UPDATE }, { id, updateSeatDto });
    }

    @Patch("toggleSeatStatus/:id")
    toggleSeatStatus(@Param('id') id: string, @Body() body: { is_active: boolean }) {
        return this.client.send({ cmd: 'toggle_seat_status' }, { id, is_active: body.is_active });
    }

    @Delete(':id')
    deleteSeat(@Param('id') id: string) {
        return this.client.send({ cmd: SEAT_CMD.DELETE }, id);
    }
}
