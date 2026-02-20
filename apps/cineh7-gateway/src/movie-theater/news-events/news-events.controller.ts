import { Controller, Get, Post, Body, Param, Delete, Patch, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNewsEventDto, UpdateNewsEventDto, NEWS_EVENT_CMD } from "@libs/common";

@Controller('new-event')
export class NewsEventsController {
    constructor(@Inject('MOVIE_THEATER_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    getAllNewsEvents() {
        return this.client.send({ cmd: NEWS_EVENT_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getNewEventById(@Param('id') id: string) {
        return this.client.send({ cmd: NEWS_EVENT_CMD.GET_BY_ID }, id);
    }

    @Post()
    createNewEvent(@Body() createNewsEventDto: CreateNewsEventDto) {
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
