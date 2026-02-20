import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEvent, NewsEventType } from './new-event.entities';
import { CreateNewsEventDto, UpdateNewsEventDto } from "@libs/common";

@Injectable()
export class NewsEventsService {
    constructor(
        @InjectRepository(NewsEvent)
        private newsEventRepository: Repository<NewsEvent>,
    ) { }

    async createNewEvent(createNewsEventDto: CreateNewsEventDto): Promise<NewsEvent> {
        const { slug, title, ...rest } = createNewsEventDto;
        const initialSlug = slug || this.generateNewEventSlug(title);
        const uniqueSlug = await this.ensureUniqueSlug(initialSlug);

        const newsEvent = this.newsEventRepository.create({
            ...rest,
            title,
            slug: uniqueSlug,
        });

        return this.newsEventRepository.save(newsEvent);
    }

    async getAllNewsEvents() {
        const newsEvents = await this.newsEventRepository.find();
        return newsEvents;
    }

    async getNewEventById(id: string): Promise<NewsEvent> {
        const newsEvent = await this.newsEventRepository.findOne({ where: { id } });
        if (!newsEvent) {
            throw new NotFoundException(`NewsEvent with ID ${id} not found`);
        }
        return newsEvent;
    }

    async findNewEventBySlug(slug: string): Promise<NewsEvent> {
        const newsEvent = await this.newsEventRepository.findOneBy({ slug });
        if (!newsEvent) {
            throw new NotFoundException(`NewsEvent with slug ${slug} not found`);
        }
        return newsEvent;
    }

    async updateNewEvent(id: string, updateNewsEventDto: UpdateNewsEventDto): Promise<NewsEvent> {
        const newEvent = await this.newsEventRepository.findOne({ where: { id } });

        if (!newEvent) {
            throw new NotFoundException(`NewsEvent with ID ${id} not found`);
        }

        if (updateNewsEventDto.slug && updateNewsEventDto.slug !== newEvent.slug) {
            updateNewsEventDto.slug = await this.ensureUniqueSlug(updateNewsEventDto.slug);
        }

        Object.assign(newEvent, updateNewsEventDto);
        return this.newsEventRepository.save(newEvent);
    }

    async deleteNewevent(id: string): Promise<void> {
        const result = await this.newsEventRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`NewsEvent with ID ${id} not found`);
        }
    }

    private generateNewEventSlug(title: string): string {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    private async ensureUniqueSlug(slug: string): Promise<string> {
        let uniqueSlug = slug;
        let counter = 1;
        while (await this.newsEventRepository.findOneBy({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }
        return uniqueSlug;
    }
}
