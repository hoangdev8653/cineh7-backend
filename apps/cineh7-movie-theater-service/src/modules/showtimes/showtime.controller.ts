import { Controller } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto, UpdateShowtimeDto, CreateBulkShowtimeDto, SHOWTIME_CMD } from "@libs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ShowtimeController {
    constructor(private readonly showtimeService: ShowtimeService) { }

    @MessagePattern({ cmd: SHOWTIME_CMD.CREATE })
    async createShowtime(@Payload() createShowtimeDto: CreateShowtimeDto) {
        const showtime = await this.showtimeService.createShowtime(createShowtimeDto);
        return {
            message: 'Tạo lịch chiếu thành công',
            showtime,
        }
    }

    @MessagePattern({ cmd: 'create_bulk_showtimes' })
    async createBulkShowtimes(@Payload() createBulkDto: CreateBulkShowtimeDto) {
        const result = await this.showtimeService.createBulkShowtimes(createBulkDto);
        return {
            message: 'Tạo lịch chiếu hàng loạt hoàn tất',
            data: result
        }
    }

    @MessagePattern({ cmd: SHOWTIME_CMD.GET_ALL })
    async getAllShowtimes() {
        const data = await this.showtimeService.getAllShowtimes();
        return {
            message: 'Lấy danh sách lịch chiếu thành công',
            data,
        }
    }

    @MessagePattern({ cmd: SHOWTIME_CMD.GET_BY_ID })
    async getShowtimeById(@Payload() id: string) {
        const data = await this.showtimeService.getShowtimeById(id);
        return {
            message: 'Lấy thông tin lịch chiếu thành công',
            data,
        }
    }

    @MessagePattern({ cmd: SHOWTIME_CMD.UPDATE })
    async updateShowtimeById(@Payload() data: { id: string, updateShowtimeDto: UpdateShowtimeDto }) {
        const showtime = await this.showtimeService.updateShowtimeById(data.id, data.updateShowtimeDto);
        return {
            message: 'Cập nhật lịch chiếu thành công',
            showtime,
        }
    }

    @MessagePattern({ cmd: SHOWTIME_CMD.DELETE })
    async deleteShowtimeById(@Payload() id: string) {
        const showtimeDeleted = await this.showtimeService.deleteShowtimeById(id);
        return {
            message: 'Xóa lịch chiếu thành công',
            showtimeDeleted,
        }
    }
}
