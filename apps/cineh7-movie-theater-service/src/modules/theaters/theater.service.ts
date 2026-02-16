import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from './theater.entities';
import { CreateTheaterDto, UpdateTheaterDto } from './theater.dto';

@Injectable()
export class TheaterService {
    constructor(
        @InjectRepository(Theater)
        private theaterRepository: Repository<Theater>,
    ) { }

    async createTheater(createTheaterDto: CreateTheaterDto): Promise<Theater> {
        const theater = this.theaterRepository.create(createTheaterDto);
        return await this.theaterRepository.save(theater);
    }

    async getAllTheaters(): Promise<Theater[]> {
        return await this.theaterRepository.find({ relations: ['system'] });
    }

    async getTheaterById(id: string): Promise<Theater> {
        const theater = await this.theaterRepository.findOne({
            where: { id },
            relations: ['system']
        });
        if (!theater) {
            throw new NotFoundException(`Không tìm thấy rạp chiếu phim với ID ${id}`);
        }
        return theater;
    }

    async updateTheaterById(id: string, updateTheaterDto: UpdateTheaterDto): Promise<Theater> {
        const theater = await this.getTheaterById(id);
        Object.assign(theater, updateTheaterDto);
        return await this.theaterRepository.save(theater);
    }

    async deleteTheaterById(id: string): Promise<Theater> {
        const theater = await this.getTheaterById(id);
        const result = await this.theaterRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Không tìm thấy rạp chiếu phim với ID ${id}`);
        }
        return theater;
    }
}
