import { Controller, Get, Post, Body, Param, Delete, Put, Inject, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMovieDto, UpdateMovieDto, MOVIE_CMD } from '@libs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movie')
export class MovieController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Post()
    @UseInterceptors(FileInterceptor('video_url'))
    createMovie(@Body() createMovieDto: CreateMovieDto, @UploadedFile() file: Express.Multer.File) {
        return this.client.send({ cmd: MOVIE_CMD.CREATE }, { createMovieDto, file });
    }

    @Get()
    getAllMovies() {
        return this.client.send({ cmd: MOVIE_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getMovieById(@Param('id') id: string) {
        return this.client.send({ cmd: MOVIE_CMD.GET_BY_ID }, id);
    }

    @Put(':id')
    updateMovieById(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.client.send({ cmd: MOVIE_CMD.UPDATE }, { id, updateMovieDto });
    }

    @Delete(':id')
    deleteMovieById(@Param('id') id: string) {
        return this.client.send({ cmd: MOVIE_CMD.DELETE }, id);
    }
}
