import { Controller, Get, Post, Body, Param, Delete, Put, Inject, UseInterceptors, Patch, Query, UploadedFiles } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMovieDto, UpdateMovieDto, MOVIE_CMD } from '@libs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@libs/cloudinary';

@Controller('movie')
export class MovieController {
    constructor(
        @Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image_url', maxCount: 1 },
        { name: 'video_url', maxCount: 1 },
    ]))
    async createMovie(
        @Body() createMovieDto: CreateMovieDto,
        @UploadedFiles() files: { image_url?: Express.Multer.File[], video_url?: Express.Multer.File[] }
    ) {
        const payload: any = { ...createMovieDto };

        if (files?.image_url?.[0]) {
            const uploaded = await this.cloudinaryService.uploadFile(files.image_url[0]);
            payload.image_url = uploaded.url;
        }

        if (files?.video_url?.[0]) {
            const uploaded = await this.cloudinaryService.uploadFile(files.video_url[0]);
            payload.video_url = uploaded.url;
        }

        return this.client.send({ cmd: MOVIE_CMD.CREATE }, payload);
    }

    @Get()
    getAllMovies() {
        return this.client.send({ cmd: MOVIE_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getMovieById(@Param('id') id: string) {
        return this.client.send({ cmd: MOVIE_CMD.GET_BY_ID }, id);
    }

    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image_url', maxCount: 1 },
        { name: 'video_url', maxCount: 1 },
    ]))
    async updateMovieById(
        @Param('id') id: string,
        @Body() updateMovieDto: UpdateMovieDto,
        @UploadedFiles() files: { image_url?: Express.Multer.File[], video_url?: Express.Multer.File[] }
    ) {
        console.log(`[Gateway] Received UPDATE_MOVIE request for ID: ${id}`);
        console.log(`[Gateway] Body: ${JSON.stringify(updateMovieDto)}`);
        console.log(`[Gateway] Files: ${Object.keys(files || {})}`);

        const payload: any = { ...updateMovieDto };

        if (files?.image_url?.[0]) {
            console.log(`[Gateway] Uploading image_url...`);
            const uploaded = await this.cloudinaryService.uploadFile(files.image_url[0]);
            payload.image_url = uploaded.url;
            console.log(`[Gateway] image_url uploaded: ${payload.image_url}`);
        }

        if (files?.video_url?.[0]) {
            console.log(`[Gateway] Uploading video_url...`);
            const uploaded = await this.cloudinaryService.uploadFile(files.video_url[0]);
            payload.video_url = uploaded.url;
            console.log(`[Gateway] video_url uploaded: ${payload.video_url}`);
        }

        console.log(`[Gateway] Sending to service: ${JSON.stringify(payload)}`);
        return this.client.send({ cmd: MOVIE_CMD.UPDATE }, { id, updateMovieDto: payload });
    }

    @Delete(':id')
    deleteMovieById(@Param('id') id: string) {
        return this.client.send({ cmd: MOVIE_CMD.DELETE }, id);
    }
}
