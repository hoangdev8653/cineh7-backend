import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './rome.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post()
    async createRoom(@Body() createRoomDto: CreateRoomDto) {
        const room = await this.roomService.createRoom(createRoomDto);
        return {
            message: 'Tạo phòng thành công',
            data: room
        };
    }

    @Get()
    async getAllRooms() {
        const rooms = await this.roomService.getAllRooms();
        return {
            message: 'Lấy danh sách phòng thành công',
            data: rooms
        };
    }

    @Get(':id')
    async getRoomById(@Param('id') id: string) {
        const room = await this.roomService.getRoomById(id);
        return {
            message: 'Lấy thông tin phòng thành công',
            data: room
        };
    }

    @Put(':id')
    async updateRoom(@Param('id') id: string, updateRoomDto: UpdateRoomDto) {
        const room = await this.roomService.updateRoom(id, updateRoomDto);
        return {
            message: 'Cập nhật phòng thành công',
            data: room
        };
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: string) {
        const room = await this.roomService.deleteRoom(id);
        return {
            message: 'Xóa phòng thành công'
        };
    }
}
