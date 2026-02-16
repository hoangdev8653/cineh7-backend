import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto, UpdateTheaterDto } from './theater.dto';

@Controller('theater')
export class TheaterController {
    constructor(private readonly theaterService: TheaterService) { }

    @Post()
    async createTheater(@Body() createTheaterDto: CreateTheaterDto) {
        const theater = await this.theaterService.createTheater(createTheaterDto);
        return {
            message: 'Tạo rạp chiếu phim thành công',
            theater,
        }
    }

    @Get()
    async getAllTheaters() {
        const theaters = await this.theaterService.getAllTheaters();
        return {
            message: 'Lấy danh sách rạp chiếu phim thành công',
            theaters,
        }
    }

    @Get(':id')
    async getTheaterById(@Param('id') id: string) {
        const theater = await this.theaterService.getTheaterById(id);
        return {
            message: 'Lấy thông tin rạp chiếu phim thành công',
            theater,
        }
    }

    @Put(':id')
    async updateTheaterById(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto) {
        const theater = await this.theaterService.updateTheaterById(id, updateTheaterDto);
        return {
            message: 'Cập nhật thông tin rạp chiếu phim thành công',
            theater,
        }
    }

    @Delete(':id')
    async deleteTheaterById(@Param('id') id: string) {
        const theaterDeleted = await this.theaterService.deleteTheaterById(id);
        return {
            message: 'Xóa rạp chiếu phim thành công',
            theaterDeleted,
        }
    }
}
