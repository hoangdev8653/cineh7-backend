import { Controller, Get, Post, Body, Param, Delete, Patch, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateShowtimeDto, UpdateShowtimeDto, CreateBulkShowtimeDto, SHOWTIME_CMD } from "@libs/common";

@Controller('showtime')
export class ShowtimeController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Post()
    createShowtime(@Body() createShowtimeDto: CreateShowtimeDto) {
        return this.client.send({ cmd: SHOWTIME_CMD.CREATE }, createShowtimeDto);
    }

    @Post('bulk')
    createBulkShowtimes(@Body() createBulkDto: CreateBulkShowtimeDto) {
        return this.client.send({ cmd: 'create_bulk_showtimes' }, createBulkDto);
    }

    @Get()
    getAllShowtimes() {
        return this.client.send({ cmd: SHOWTIME_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getShowtimeById(@Param('id') id: string) {
        return this.client.send({ cmd: SHOWTIME_CMD.GET_BY_ID }, id);
    }

    @Patch(':id')
    updateShowtimeById(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
        return this.client.send({ cmd: SHOWTIME_CMD.UPDATE }, { id, updateShowtimeDto });
    }

    @Delete(':id')
    deleteShowtimeById(@Param('id') id: string) {
        return this.client.send({ cmd: SHOWTIME_CMD.DELETE }, id);
    }
}
