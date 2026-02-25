import { Controller } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto, MOVIE_CMD } from '@libs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @MessagePattern({ cmd: MOVIE_CMD.CREATE })
  async createMovie(
    @Payload()
    data: {
      createMovieDto: CreateMovieDto;
      file: Express.Multer.File;
    },
  ) {
    const movie = await this.movieService.createMovie(
      data.createMovieDto,
      data.file,
    );
    return {
      message: 'Tạo phim mới thành công',
      data: movie,
    };
  }

  @MessagePattern({ cmd: MOVIE_CMD.GET_ALL })
  async getAllMovies() {
    const movies = await this.movieService.getAllMovies();
    return {
      message: 'Lấy danh sách phim thành công',
      data: movies,
    };
  }

  @MessagePattern({ cmd: MOVIE_CMD.GET_BY_ID })
  async getMovieById(@Payload() id: string) {
    const movie = await this.movieService.getMovieById(id);
    return {
      message: 'Lấy thông tin phim thành công',
      data: movie,
    };
  }

  @MessagePattern({ cmd: MOVIE_CMD.UPDATE })
  async updateMovieById(
    @Payload() data: { id: string; updateMovieDto: UpdateMovieDto },
  ) {
    const movie = await this.movieService.updateMovieById(
      data.id,
      data.updateMovieDto,
    );
    return {
      message: 'Cập nhật thông tin phim thành công',
      data: movie,
    };
  }

  @MessagePattern({ cmd: MOVIE_CMD.DELETE })
  async deleteMovieById(@Payload() id: string) {
    const movieDeleted = await this.movieService.deleteMovieById(id);
    return {
      message: 'Xóa phim thành công',
      data: movieDeleted,
    };
  }
}
