import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TheaterSystemService } from './theater-system.service';
import { CreateTheaterSystemDto, UpdateTheaterSystemDto } from "./theater-system.dto"
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('theater-system')
export class TheaterSystemController {
    constructor(private readonly theaterSystemService: TheaterSystemService) { }

    @Get()
    async getAllTheaterSystems() {
        const theaterSystems = await this.theaterSystemService.getAllTheaterSystems();
        return {
            message: "Lấy danh sách hệ thống rạp thành công",
            theaterSystems
        }
    }
    @Post()
    // @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('logo'))
    async createTheaterSystem(@Body() createTheaterSystemDto: CreateTheaterSystemDto, @UploadedFile() file: Express.Multer.File) {
        const data = await this.theaterSystemService.createTheaterSystem(createTheaterSystemDto, file);
        return {
            message: "Tạo hệ thống rạp thành công",
            data
        }
    }

    @Get(':id')
    async getTheaterSystemById(@Param('id') id: string) {
        const theaterSystem = await this.theaterSystemService.getTheaterSystemById(id);
        return {
            message: "Lấy thông tin hệ thống rạp thành công",
            theaterSystem
        }
    }

    @Put(':id')
    async updateTheaterSystem(@Param('id') id: string, @Body() updateTheaterSystemDto: UpdateTheaterSystemDto) {
        const theaterSystem = await this.theaterSystemService.updateTheaterSystem(id, updateTheaterSystemDto);
        return {
            message: "Cập nhật hệ thống rạp thành công",
            theaterSystem
        }
    }

    @Delete(':id')
    async deleteTheaterSystem(@Param('id') id: string) {
        const theaterSystemDeleted = await this.theaterSystemService.deleteTheaterSystem(id);
        return {
            message: "Xóa hệ thống rạp thành công",
            theaterSystemDeleted
        }
    }
}