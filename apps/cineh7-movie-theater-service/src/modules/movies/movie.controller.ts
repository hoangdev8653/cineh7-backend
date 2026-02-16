import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Post()
    @UseInterceptors(FileInterceptor('video_url'))
    async createMovie(@Body() createMovieDto: CreateMovieDto, @UploadedFile() file: Express.Multer.File) {
        const movie = await this.movieService.createMovie(createMovieDto, file);
        return {
            message: 'Tạo phim mới thành công',
            movie,
        }
    }

    @Get()
    async getAllMovies() {
        const movies = await this.movieService.getAllMovies();
        return {
            message: 'Lấy danh sách phim thành công',
            movies,
        }
    }

    @Get(':id')
    async getMovieById(@Param('id', ParseUUIDPipe) id: string) {
        const movie = await this.movieService.getMovieById(id);
        return {
            message: 'Lấy thông tin phim thành công',
            movie,
        }
    }

    @Put(':id')
    async updateMovieById(@Param('id', ParseUUIDPipe) id: string, @Body() updateMovieDto: UpdateMovieDto) {
        const movie = await this.movieService.updateMovieById(id, updateMovieDto);
        return {
            message: 'Cập nhật thông tin phim thành công',
            movie,
        }
    }

    @Delete(':id')
    async deleteMovieById(@Param('id', ParseUUIDPipe) id: string) {
        const movieDeleted = await this.movieService.deleteMovieById(id);
        return {
            message: 'Xóa phim thành công',
            movieDeleted,
        }
    }
}
