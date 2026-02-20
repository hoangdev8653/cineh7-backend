import { Controller } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto, UpdateSeatDto, SEAT_CMD } from "@libs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SeatController {
    constructor(private readonly seatService: SeatService) { }

    @MessagePattern({ cmd: SEAT_CMD.CREATE })
    async createSeatsMap(@Payload() createSeatDto: CreateSeatDto) {
        const seat = await this.seatService.createSeatsMap(createSeatDto);
        return {
            message: 'Tạo ghế thành công',
            data: seat
        };
    }

    @MessagePattern({ cmd: 'bulk_update_row' })
    async updateSeatsTypeByRow(@Payload() body: { room_id: string, row: string, type: string }) {
        const data = await this.seatService.updateSeatsTypeByRow(body.room_id, body.row, body.type);
        return {
            message: `Đã cập nhật hàng ghế ${body.row} thành loại ${body.type} thành công`,
            data
        };
    }

    @MessagePattern({ cmd: SEAT_CMD.GET_ALL })
    async getAllSeats() {
        const seats = await this.seatService.getAllSeats();
        return {
            message: 'Lấy danh sách ghế thành công',
            data: seats
        };
    }

    @MessagePattern({ cmd: 'get_seats_by_room' })
    async getSeatsByRoomId(@Payload() room_id: string) {
        const seats = await this.seatService.getSeatsByRoomId(room_id);
        return {
            message: 'Lấy danh sách ghế thành công',
            data: seats
        };
    }

    @MessagePattern({ cmd: SEAT_CMD.GET_BY_ID })
    async getSeatById(@Payload() id: string) {
        const seat = await this.seatService.getSeatById(id);
        return {
            message: 'Lấy thông tin ghế thành công',
            data: seat
        };
    }

    @MessagePattern({ cmd: SEAT_CMD.UPDATE })
    async updateSeat(@Payload() data: { id: string, updateSeatDto: UpdateSeatDto }) {
        const seat = await this.seatService.updateSeat(data.id, data.updateSeatDto);
        return {
            message: 'Cập nhật ghế thành công',
            data: seat
        };
    }

    @MessagePattern({ cmd: 'toggle_seat_status' })
    async toggleSeatStatus(@Payload() body: { id: string, is_active: boolean }) {
        const seat = await this.seatService.toggleSeatStatus(body.id, body.is_active);
        return {
            message: 'Cập nhật trạng thái ghế thành công',
            data: seat
        };
    }

    @MessagePattern({ cmd: SEAT_CMD.DELETE })
    async deleteSeat(@Payload() id: string) {
        await this.seatService.deleteSeat(id);
        return {
            message: 'Xóa ghế thành công'
        };
    }
}
