import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto, UpdateShowtimeDto, CreateBulkShowtimeDto } from './showtime.dto';

@Controller('showtime')
export class ShowtimeController {
    constructor(private readonly showtimeService: ShowtimeService) { }

    @Post()
    async createShowtime(@Body() createShowtimeDto: CreateShowtimeDto) {
        const showtime = await this.showtimeService.createShowtime(createShowtimeDto);
        return {
            message: 'Tạo lịch chiếu thành công',
            showtime,
        }
    }

    @Post('bulk')
    async createBulkShowtimes(@Body() createBulkDto: CreateBulkShowtimeDto) {
        const result = await this.showtimeService.createBulkShowtimes(createBulkDto);
        return {
            message: 'Tạo lịch chiếu hàng loạt hoàn tất',
            data: result
        }
    }

    @Get()
    async getAllShowtimes() {
        const data = await this.showtimeService.getAllShowtimes();
        return {
            message: 'Lấy danh sách lịch chiếu thành công',
            data,
        }
    }

    @Get(':id')
    async getShowtimeById(@Param('id', ParseUUIDPipe) id: string) {
        const data = await this.showtimeService.getShowtimeById(id);
        return {
            message: 'Lấy thông tin lịch chiếu thành công',
            data,
        }
    }

    @Patch(':id')
    async updateShowtimeById(@Param('id', ParseUUIDPipe) id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
        const showtime = await this.showtimeService.updateShowtimeById(id, updateShowtimeDto);
        return {
            message: 'Cập nhật lịch chiếu thành công',
            showtime,
        }
    }

    @Delete(':id')
    async deleteShowtimeById(@Param('id', ParseUUIDPipe) id: string) {
        const showtimeDeleted = await this.showtimeService.deleteShowtimeById(id);
        return {
            message: 'Xóa lịch chiếu thành công',
            showtimeDeleted,
        }
    }
}
