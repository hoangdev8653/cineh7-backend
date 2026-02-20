import { Controller, Get, Post, Body, Param, Delete, Put, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTheaterDto, UpdateTheaterDto, THEATER_CMD } from "@libs/common";

@Controller('theater')
export class TheaterController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Post()
    createTheater(@Body() createTheaterDto: CreateTheaterDto) {
        return this.client.send({ cmd: THEATER_CMD.CREATE }, createTheaterDto);
    }

    @Get()
    getAllTheaters() {
        return this.client.send({ cmd: THEATER_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getTheaterById(@Param('id') id: string) {
        return this.client.send({ cmd: THEATER_CMD.GET_BY_ID }, id);
    }

    @Put(':id')
    updateTheaterById(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto) {
        return this.client.send({ cmd: THEATER_CMD.UPDATE }, { id, updateTheaterDto });
    }

    @Delete(':id')
    deleteTheaterById(@Param('id') id: string) {
        return this.client.send({ cmd: THEATER_CMD.DELETE }, id);
    }
}
