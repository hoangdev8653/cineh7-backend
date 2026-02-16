import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Query } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto, UpdateSeatDto, } from './seat.dto';

@Controller('seat')
export class SeatController {
    constructor(private readonly seatService: SeatService) { }

    @Post()
    async createSeatsMap(@Body() createSeatDto: CreateSeatDto) {
        const seat = await this.seatService.createSeatsMap(createSeatDto);
        return {
            message: 'Tạo ghế thành công',
            data: seat
        };
    }

    @Put('bulk/update-row')
    async updateSeatsTypeByRow(@Body() body: { room_id: string, row: string, type: string }) {
        const data = await this.seatService.updateSeatsTypeByRow(body.room_id, body.row, body.type);
        return {
            message: `Đã cập nhật hàng ghế ${body.row} thành loại ${body.type} thành công`,
            data
        };
    }

    @Get()
    async getAllSeats() {
        const seats = await this.seatService.getAllSeats();
        return {
            message: 'Lấy danh sách ghế thành công',
            data: seats
        };
    }

    @Get('room/:room_id')
    async getSeatsByRoomId(@Param('room_id') room_id: string) {
        const seats = await this.seatService.getSeatsByRoomId(room_id);
        return {
            message: 'Lấy danh sách ghế thành công',
            data: seats
        };
    }

    @Get(':id')
    async getSeatById(@Param('id') id: string) {
        const seat = await this.seatService.getSeatById(id);
        return {
            message: 'Lấy thông tin ghế thành công',
            data: seat
        };
    }

    @Put(':id')
    async updateSeat(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
        const seat = await this.seatService.updateSeat(id, updateSeatDto);
        return {
            message: 'Cập nhật ghế thành công',
            data: seat
        };
    }

    @Patch("toggleSeatStatus/:id")
    async toggleSeatStatus(@Param('id') id: string, @Body() body: { is_active: boolean }) {
        const seat = await this.seatService.toggleSeatStatus(id, body.is_active);
        return {
            message: 'Cập nhật trạng thái ghế thành công',
            data: seat
        };
    }

    @Delete(':id')
    async deleteSeat(@Param('id') id: string) {
        await this.seatService.deleteSeat(id);
        return {
            message: 'Xóa ghế thành công'
        };
    }
}
