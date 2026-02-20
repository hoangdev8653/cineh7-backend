import { Controller } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto, ROOM_CMD } from "@libs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @MessagePattern({ cmd: ROOM_CMD.CREATE })
    async createRoom(@Payload() createRoomDto: CreateRoomDto) {
        const room = await this.roomService.createRoom(createRoomDto);
        return {
            message: 'Tạo phòng thành công',
            data: room
        };
    }

    @MessagePattern({ cmd: ROOM_CMD.GET_ALL })
    async getAllRooms() {
        const rooms = await this.roomService.getAllRooms();
        return {
            message: 'Lấy danh sách phòng thành công',
            data: rooms
        };
    }

    @MessagePattern({ cmd: ROOM_CMD.GET_BY_ID })
    async getRoomById(@Payload() id: string) {
        const room = await this.roomService.getRoomById(id);
        return {
            message: 'Lấy thông tin phòng thành công',
            data: room
        };
    }

    @MessagePattern({ cmd: ROOM_CMD.UPDATE })
    async updateRoom(@Payload() data: { id: string, updateRoomDto: UpdateRoomDto }) {
        const room = await this.roomService.updateRoom(data.id, data.updateRoomDto);
        return {
            message: 'Cập nhật phòng thành công',
            data: room
        };
    }

    @MessagePattern({ cmd: ROOM_CMD.DELETE })
    async deleteRoom(@Payload() id: string) {
        const room = await this.roomService.deleteRoom(id);
        return {
            message: 'Xóa phòng thành công'
        };
    }
}
