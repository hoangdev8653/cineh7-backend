import { Controller, Get, Post, Body, Param, Delete, Put, Inject, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTheaterSystemDto, UpdateTheaterSystemDto, THEATER_SYSTEM_CMD } from "@libs/common";
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('theater-system')
export class TheaterSystemController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    getAllTheaterSystems() {
        return this.client.send({ cmd: THEATER_SYSTEM_CMD.GET_ALL }, {});
    }

    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    createTheaterSystem(@Body() createTheaterSystemDto: CreateTheaterSystemDto, @UploadedFile() file: Express.Multer.File) {
        return this.client.send({ cmd: THEATER_SYSTEM_CMD.CREATE }, { createTheaterSystemDto, file });
    }

    @Get(':id')
    getTheaterSystemById(@Param('id') id: string) {
        return this.client.send({ cmd: THEATER_SYSTEM_CMD.GET_BY_ID }, id);
    }

    @Put(':id')
    updateTheaterSystem(@Param('id') id: string, @Body() updateTheaterSystemDto: UpdateTheaterSystemDto) {
        return this.client.send({ cmd: THEATER_SYSTEM_CMD.UPDATE }, { id, updateTheaterSystemDto });
    }

    @Delete(':id')
    deleteTheaterSystem(@Param('id') id: string) {
        return this.client.send({ cmd: THEATER_SYSTEM_CMD.DELETE }, id);
    }
}
