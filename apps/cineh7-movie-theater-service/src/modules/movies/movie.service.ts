import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entities';
import { CreateMovieDto, UpdateMovieDto } from '@libs/common';


@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
    ) { }

    async getAllMovies(): Promise<Movie[]> {
        return await this.movieRepository.find();
    }

    async getMovieById(id: string): Promise<Movie> {
        const movie = await this.movieRepository.findOneBy({ id });
        if (!movie) {
            throw new NotFoundException(`Không tìm thấy phim với ID ${id}`);
        }
        return movie;
    }

    async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        if (typeof createMovieDto.metadata === 'string') {
            try {
                createMovieDto.metadata = JSON.parse(createMovieDto.metadata);
            } catch (e) {
                throw new BadRequestException('Invalid JSON format in metadata field');
            }
        }

        if (!createMovieDto.metadata) {
            createMovieDto.metadata = {};
        }

        const movie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(movie);
    }

    async updateMovieById(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        console.log(`[Service] Updating movie ID: ${id}`);
        console.log(`[Service] Update DTO: ${JSON.stringify(updateMovieDto)}`);

        const movie = await this.getMovieById(id);

        if (typeof updateMovieDto.metadata === 'string') {
            try {
                updateMovieDto.metadata = JSON.parse(updateMovieDto.metadata);
            } catch (e) {
                throw new BadRequestException('Invalid JSON format in metadata field');
            }
        }

        Object.assign(movie, updateMovieDto);
        console.log(`[Service] Movie after assign: ${JSON.stringify(movie)}`);

        const updated = await this.movieRepository.save(movie);
        console.log(`[Service] Movie after save: ${JSON.stringify(updated)}`);

        return updated;
    }

    async deleteMovieById(id: string): Promise<Movie> {
        const result = await this.movieRepository.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException(`Không tìm thấy phim với ID ${id}`);
        }
        const movieDeleted = await this.movieRepository.remove(result);
        return movieDeleted;
    }
}
