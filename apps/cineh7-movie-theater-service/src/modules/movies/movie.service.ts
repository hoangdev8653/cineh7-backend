import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entities';
import { CreateMovieDto, UpdateMovieDto } from '@libs/common';
import { CloudinaryService } from "@libs/cloudinary/cloudinary.service";


@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        private cloudinaryService: CloudinaryService,
    ) { }

    async createMovie(createMovieDto: CreateMovieDto, file: Express.Multer.File): Promise<Movie> {
        if (typeof createMovieDto.metadata === 'string') {
            try {
                createMovieDto.metadata = JSON.parse(createMovieDto.metadata);
            } catch (e) {
                throw new BadRequestException('Invalid JSON format in metadata field');
            }
        }

        if (file) {
            const image = await this.cloudinaryService.uploadFile(file);

            if (!createMovieDto.metadata || typeof createMovieDto.metadata !== 'object') {
                createMovieDto.metadata = {};
            }

            createMovieDto.video_url = image.url;
        }

        if (!createMovieDto.metadata) {
            createMovieDto.metadata = {};
        }

        const movie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(movie);
    }

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

    async updateMovieById(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        const movie = await this.getMovieById(id);
        Object.assign(movie, updateMovieDto);
        return await this.movieRepository.save(movie);
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
