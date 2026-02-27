import { Controller, Get, Post, Body, Param, Delete, Put, Inject, UseInterceptors, UploadedFiles, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTheaterDto, UpdateTheaterDto, THEATER_CMD } from "@libs/common";
import { CloudinaryService } from '@libs/cloudinary';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('theater')
export class TheaterController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy,
        private readonly cloudinaryService: CloudinaryService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image_url', maxCount: 1 },
    ]))
    async createTheater(@Body() createTheaterDto: CreateTheaterDto, @UploadedFiles() image_url: { image_url: Express.Multer.File[] }) {
        if (image_url.image_url && image_url.image_url.length > 0) {
            const url = await this.cloudinaryService.uploadFile(image_url.image_url[0]);
            createTheaterDto.image_url = url.url;
        }
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

    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image_url', maxCount: 1 },
    ]))
    async updateTheaterById(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto, @UploadedFiles() image_url: { image_url: Express.Multer.File[] }) {
        if (image_url.image_url && image_url.image_url.length > 0) {
            const url = await this.cloudinaryService.uploadFile(image_url.image_url[0]);
            updateTheaterDto.image_url = url.url;
        }
        return this.client.send({ cmd: THEATER_CMD.UPDATE }, { id, updateTheaterDto });
    }

    @Delete(':id')
    deleteTheaterById(@Param('id') id: string) {
        return this.client.send({ cmd: THEATER_CMD.DELETE }, id);
    }
}
