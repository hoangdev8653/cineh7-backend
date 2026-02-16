import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './seat.entities';
import { CreateSeatDto, UpdateSeatDto } from './seat.dto';

@Injectable()
export class SeatService {
    constructor(
        @InjectRepository(Seat)
        private readonly seatRepository: Repository<Seat>,
    ) { }

    async createSeat(createSeatDto: CreateSeatDto): Promise<Seat> {
        const rowLabel = String.fromCharCode(65 + createSeatDto.rows);
        const existingSeat = await this.seatRepository.findOne({
            where: {
                room_id: createSeatDto.room_id,
                row: rowLabel,
                number: createSeatDto.columns
            }
        });

        if (existingSeat) {
            throw new ConflictException(`Ghế ${rowLabel}${createSeatDto.columns} đã tồn tại trong phòng này!`);
        }

        const seat = this.seatRepository.create({
            ...createSeatDto,
            row: rowLabel,
            number: createSeatDto.columns,
        });
        return await this.seatRepository.save(seat);
    }

    async createSeatsMap(createSeatDto: CreateSeatDto): Promise<Seat[]> {
        const { room_id, rows, columns } = createSeatDto;

        // Check nếu phòng đã có ghế rồi thì không cho tạo map đè lên (tránh lỗi logic)
        const existingSeats = await this.seatRepository.count({ where: { room_id } });
        if (existingSeats > 0) {
            throw new ConflictException('Phòng này đã có ghế. Vui lòng xóa hết ghế trước khi tạo sơ đồ mới!');
        }

        const seats: Seat[] = [];
        for (let i = 0; i < rows; i++) {
            const rowLabel = String.fromCharCode(65 + i); // 0 -> A, 1 -> B
            for (let j = 1; j <= columns; j++) {
                const seat = this.seatRepository.create({
                    row: rowLabel,
                    number: j,
                    type: 'NORMAL', // Mặc định là thường, admin sửa sau
                    is_active: true,
                    room_id: room_id
                });
                seats.push(seat);
            }
        }
        return await this.seatRepository.save(seats);
    }

    async updateSeatsTypeByRow(room_id: string, row: string, type: string): Promise<Seat[]> {
        const seats = await this.seatRepository.find({
            where: { room_id, row }
        });

        if (seats.length === 0) {
            throw new NotFoundException(`Không tìm thấy ghế nào ở hàng ${row} trong phòng này`);
        }

        for (const seat of seats) {
            seat.type = type;
        }

        return await this.seatRepository.save(seats);
    }

    async getAllSeats(): Promise<Seat[]> {
        return await this.seatRepository.find({
            relations: ['room'],
            select: {
                room: {
                    id: true,
                    name: true,
                    type: true,
                    total_seats: true,
                    theater_id: true,
                }
            } as any
        });
    }

    async getSeatById(id: string): Promise<Seat> {
        const seat = await this.seatRepository.findOne({
            where: { id }, relations: ['room'], select: {
                room: {
                    id: true,
                    name: true,
                    type: true,
                    total_seats: true,
                    theater_id: true,
                }
            } as any
        });
        if (!seat) {
            throw new NotFoundException(`Seat with ID ${id} not found`);
        }
        return seat;
    }

    async getSeatsByRoomId(room_id: string): Promise<Seat[]> {
        return await this.seatRepository.find({
            where: { room_id }, relations: ['room'], select: {
                room: {
                    id: true,
                    name: true,
                    type: true,
                    total_seats: true,
                    theater_id: true,
                }
            } as any
        });
    }

    async toggleSeatStatus(id: string, is_active: boolean): Promise<Seat> {
        const seat = await this.seatRepository.findOne({ where: { id } });
        if (!seat) {
            throw new NotFoundException(`Seat with ID ${id} not found`);
        }
        seat.is_active = is_active;
        return await this.seatRepository.save(seat, { reload: true });
    }

    async updateSeat(id: string, updateSeatDto: UpdateSeatDto): Promise<Seat> {
        const seat = await this.getSeatById(id);
        Object.assign(seat, updateSeatDto);
        return await this.seatRepository.save(seat);
    }

    async deleteSeat(id: string): Promise<void> {
        const seat = await this.getSeatById(id);
        await this.seatRepository.remove(seat);
    }
}
