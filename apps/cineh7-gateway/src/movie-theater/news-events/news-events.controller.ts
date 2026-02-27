import { Controller, Get, Post, Body, Param, Delete, Patch, Inject, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNewsEventDto, UpdateNewsEventDto, NEWS_EVENT_CMD } from "@libs/common";
import { CloudinaryService } from '@libs/cloudinary';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('new-event')
export class NewsEventsController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy,
        private readonly cloudinaryService: CloudinaryService

    ) { }

    @Get()
    getAllNewsEvents() {
        return this.client.send({ cmd: NEWS_EVENT_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getNewEventById(@Param('id') id: string) {
        return this.client.send({ cmd: NEWS_EVENT_CMD.GET_BY_ID }, id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createNewEvent(
        @Body() createNewsEventDto: CreateNewsEventDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        // Xử lý content nếu nó được gửi dưới dạng string (do multipart/form-data)
        if (typeof createNewsEventDto.content === 'string') {
            try {
                createNewsEventDto.content = JSON.parse(createNewsEventDto.content);
            } catch (e) {
                createNewsEventDto.content = {};
            }
        }

        if (files && files.length > 0) {
            const uploadResults = await this.cloudinaryService.uploadFiles(files);
            const urls = uploadResults.map(res => res.secure_url);

            if (!createNewsEventDto.thumbnail && urls.length > 0) {
                createNewsEventDto.thumbnail = urls[0];
            }

            createNewsEventDto.content = {
                ...(createNewsEventDto.content || {}),
                images: urls
            };
        }
        return this.client.send({ cmd: NEWS_EVENT_CMD.CREATE }, createNewsEventDto);
    }

    @Patch(':id')
    updateNewEvent(@Param('id') id: string, @Body() updateNewsEventDto: UpdateNewsEventDto) {
        return this.client.send({ cmd: NEWS_EVENT_CMD.UPDATE }, { id, updateNewsEventDto });
    }

    @Delete(':id')
    deleteNewevent(@Param('id') id: string) {
        return this.client.send({ cmd: NEWS_EVENT_CMD.DELETE }, id);
    }
}
