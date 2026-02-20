import { Controller } from '@nestjs/common';
import { NewsEventsService } from './new-event.service';
import { CreateNewsEventDto, UpdateNewsEventDto, NEWS_EVENT_CMD } from "@libs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NewsEventsController {
    constructor(private readonly newsEventsService: NewsEventsService) { }

    @MessagePattern({ cmd: NEWS_EVENT_CMD.GET_ALL })
    async getAllNewsEvents() {
        const newEvents = await this.newsEventsService.getAllNewsEvents();
        return {
            message: 'success',
            data: newEvents
        }
    }

    @MessagePattern({ cmd: NEWS_EVENT_CMD.GET_BY_ID })
    async getNewEventById(@Payload() id: string) {
        const newEvent = await this.newsEventsService.getNewEventById(id);
        return {
            message: 'success',
            data: newEvent
        }
    }

    @MessagePattern({ cmd: NEWS_EVENT_CMD.CREATE })
    async createNewEvent(@Payload() createNewsEventDto: CreateNewsEventDto) {
        const newEvent = await this.newsEventsService.createNewEvent(createNewsEventDto);
        return {
            message: 'success',
            data: newEvent
        }
    }

    @MessagePattern({ cmd: NEWS_EVENT_CMD.UPDATE })
    async updateNewEvent(@Payload() data: { id: string, updateNewsEventDto: UpdateNewsEventDto }) {
        const newEvent = await this.newsEventsService.updateNewEvent(data.id, data.updateNewsEventDto);
        return {
            message: 'success',
            data: newEvent
        }
    }

    @MessagePattern({ cmd: NEWS_EVENT_CMD.DELETE })
    async deleteNewevent(@Payload() id: string) {
        const newEvent = await this.newsEventsService.deleteNewevent(id);
        return {
            message: 'success',
            data: newEvent
        }
    }
}
