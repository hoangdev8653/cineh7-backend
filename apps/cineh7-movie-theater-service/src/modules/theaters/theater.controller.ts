import { Controller } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto, UpdateTheaterDto, THEATER_CMD } from "@libs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TheaterController {
    constructor(private readonly theaterService: TheaterService) { }

    @MessagePattern({ cmd: THEATER_CMD.CREATE })
    async createTheater(@Payload() createTheaterDto: CreateTheaterDto) {
        const theater = await this.theaterService.createTheater(createTheaterDto);
        return {
            message: 'Tạo rạp chiếu phim thành công',
            theater,
        }
    }

    @MessagePattern({ cmd: THEATER_CMD.GET_ALL })
    async getAllTheaters() {
        const theaters = await this.theaterService.getAllTheaters();
        return {
            message: 'Lấy danh sách rạp chiếu phim thành công',
            theaters,
        }
    }

    @MessagePattern({ cmd: THEATER_CMD.GET_BY_ID })
    async getTheaterById(@Payload() id: string) {
        const theater = await this.theaterService.getTheaterById(id);
        return {
            message: 'Lấy thông tin rạp chiếu phim thành công',
            theater,
        }
    }

    @MessagePattern({ cmd: THEATER_CMD.UPDATE })
    async updateTheaterById(@Payload() data: { id: string, updateTheaterDto: UpdateTheaterDto }) {
        const theater = await this.theaterService.updateTheaterById(data.id, data.updateTheaterDto);
        return {
            message: 'Cập nhật thông tin rạp chiếu phim thành công',
            theater,
        }
    }

    @MessagePattern({ cmd: THEATER_CMD.DELETE })
    async deleteTheaterById(@Payload() id: string) {
        const theaterDeleted = await this.theaterService.deleteTheaterById(id);
        return {
            message: 'Xóa rạp chiếu phim thành công',
            theaterDeleted,
        }
    }
}
