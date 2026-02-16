import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewsEventsService } from './new-event.service';
import { CreateNewsEventDto, UpdateNewsEventDto } from './new-event.dto';

@Controller('new-event')
export class NewsEventsController {
    constructor(private readonly newsEventsService: NewsEventsService) { }

    @Get()
    async getAllNewsEvents() {
        const newEvents = await this.newsEventsService.getAllNewsEvents();
        return {
            message: 'success',
            data: newEvents
        }
    }

    @Get(':id')
    async getNewEventById(@Param('id') id: string) {
        const newEvent = await this.newsEventsService.getNewEventById(id);
        return {
            message: 'success',
            data: newEvent
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createNewEvent(@Body() createNewsEventDto: CreateNewsEventDto) {
        const newEvent = await this.newsEventsService.createNewEvent(createNewsEventDto);
        return {
            message: 'success',
            data: newEvent
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateNewEvent(@Param('id') id: string, @Body() updateNewsEventDto: UpdateNewsEventDto) {
        const newEvent = await this.newsEventsService.updateNewEvent(id, updateNewsEventDto);
        return {
            message: 'success',
            data: newEvent
        }
    }


    @Delete(':id')
    async deleteNewevent(@Param('id') id: string) {
        const newEvent = await this.newsEventsService.deleteNewevent(id);
        return {
            message: 'success',
            data: newEvent
        }
    }
}
