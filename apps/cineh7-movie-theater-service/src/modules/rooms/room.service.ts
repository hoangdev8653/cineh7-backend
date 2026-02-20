import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entities';
import { CreateRoomDto, UpdateRoomDto } from "@libs/common";

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) { }

    async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        const existingRoom = await this.roomRepository.findOne({
            where: {
                name: createRoomDto.name,
                theater_id: createRoomDto.theater_id
            }
        });

        if (existingRoom) {
            throw new ConflictException(`Phòng với tên "${createRoomDto.name}" đã tồn tại trong rạp này`);
        }

        const room = this.roomRepository.create(createRoomDto);
        return await this.roomRepository.save(room);
    }

    async getAllRooms(): Promise<Room[]> {
        return await this.roomRepository.find({ relations: ['theater'] });
    }

    async getRoomById(id: string): Promise<Room> {
        const room = await this.roomRepository.findOne({ where: { id }, relations: ['theater'] });
        if (!room) {
            throw new NotFoundException(`Không tìm thấy phòng với ID ${id}`);
        }
        return room;
    }

    async updateRoom(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
        const room = await this.getRoomById(id);

        if (updateRoomDto.name && updateRoomDto.name !== room.name) {
            const existingRoom = await this.roomRepository.findOne({
                where: {
                    name: updateRoomDto.name,
                    theater_id: room.theater_id // Check in same theater
                }
            });

            if (existingRoom) {
                throw new ConflictException(`Phòng với tên "${updateRoomDto.name}" đã tồn tại trong rạp này`);
            }
        }

        Object.assign(room, updateRoomDto);
        return await this.roomRepository.save(room);
    }

    async deleteRoom(id: string): Promise<void> {
        const room = await this.roomRepository.findOne({ where: { id } });
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        await this.roomRepository.remove(room);
    }
}
