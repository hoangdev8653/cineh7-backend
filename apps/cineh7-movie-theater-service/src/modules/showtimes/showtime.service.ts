import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Showtime } from './showtime.entities';
import { CreateShowtimeDto, UpdateShowtimeDto, CreateBulkShowtimeDto } from "@libs/common";
import { Movie } from '../movies/movie.entities';

@Injectable()
export class ShowtimeService {
    constructor(
        @InjectRepository(Showtime)
        private showtimeRepository: Repository<Showtime>,
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
    ) { }

    async createShowtime(createShowtimeDto: CreateShowtimeDto): Promise<any> {
        const movie = await this.movieRepository.findOne({ where: { id: createShowtimeDto.movie_id } });
        if (!movie) {
            throw new NotFoundException(`Không tìm thấy phim với ID ${createShowtimeDto.movie_id}`);
        }
        const startTime = new Date(createShowtimeDto.start_time);
        const endTime = new Date(startTime.getTime() + movie.duration * 60000);
        await this.checkShowtimeConflict(
            createShowtimeDto.room_id,
            startTime,
            endTime
        );

        createShowtimeDto.end_time = endTime.toISOString();

        const showtime = this.showtimeRepository.create(createShowtimeDto);
        return await this.showtimeRepository.save(showtime);
    }

    async createBulkShowtimes(createBulkDto: CreateBulkShowtimeDto): Promise<{ success: Showtime[], errors: any[] }> {
        const { movie_id, room_id, date, start_from, repeat_count, cleanup_time, price } = createBulkDto;

        const movie = await this.movieRepository.findOne({ where: { id: movie_id } });
        if (!movie) {
            throw new NotFoundException(`Không tìm thấy phim với ID ${movie_id}`);
        }

        const success: Showtime[] = [];
        const errors: any[] = [];

        // Parse initial start time
        // date string: "2024-02-20" + start_from "09:00"
        let currentStartTime = new Date(`${date}T${start_from}:00`);

        for (let i = 0; i < repeat_count; i++) {
            // Calculate end time = start + duration
            const currentEndTime = new Date(currentStartTime.getTime() + movie.duration * 60000);

            try {
                // Check conflict
                await this.checkShowtimeConflict(room_id, currentStartTime, currentEndTime);

                // Create
                const showtime = this.showtimeRepository.create({
                    movie_id,
                    room_id,
                    start_time: currentStartTime,
                    end_time: currentEndTime,
                    price,
                    status: 'SCHEDULED'
                });
                const saved = await this.showtimeRepository.save(showtime);
                success.push(saved);

            } catch (error) {
                errors.push({
                    index: i + 1,
                    start_time: currentStartTime,
                    end_time: currentEndTime,
                    message: error.message
                });
            }
            currentStartTime = new Date(currentEndTime.getTime() + (cleanup_time || 15) * 60000);
        }
        return { success, errors };
    }

    async getAllShowtimes(): Promise<Showtime[]> {
        return await this.showtimeRepository.find({
            relations: ['movie', 'room', 'room.theater'],
            select: {
                id: true,
                movie_id: true,
                room_id: true,
                start_time: true,
                end_time: true,
                status: true,
                price: true,
                created_at: true,
                movie: {
                    id: true,
                    title: true,
                    duration: true,
                    release_date: true,
                },
                room: {
                    id: true,
                    name: true,
                    type: true,
                    theater_id: true,
                    theater: {
                        id: true,
                        name: true,
                        address: true,
                        location: true,
                        system_id: true
                    }
                }
            }
        });
    }

    async getGroupedShowtimes(movieId?: string, theaterId?: string): Promise<Record<string, Showtime[]>> {
        const query = this.showtimeRepository.createQueryBuilder('showtime')
            .leftJoinAndSelect('showtime.movie', 'movie')
            .leftJoinAndSelect('showtime.room', 'room')
            .leftJoinAndSelect('room.theater', 'theater')
            .orderBy('showtime.start_time', 'ASC');

        if (movieId) {
            query.andWhere('showtime.movie_id = :movieId', { movieId });
        }

        if (theaterId) {
            query.andWhere('theater.id = :theaterId', { theaterId });
        }

        const showtimes = await query.getMany();

        const grouped: Record<string, Showtime[]> = {};

        showtimes.forEach(showtime => {
            const date = new Date(showtime.start_time).toLocaleDateString('en-CA'); // YYYY-MM-DD
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(showtime);
        });

        return grouped;
    }

    async getShowtimeById(id: string): Promise<Showtime> {
        const showtime = await this.showtimeRepository.findOne({
            where: { id },
            relations: ['movie', 'room', 'room.theater'],
            select: {
                id: true,
                movie_id: true,
                room_id: true,
                start_time: true,
                end_time: true,
                status: true,
                price: true,
                created_at: true,
                movie: {
                    id: true,
                    title: true,
                    duration: true,
                    release_date: true,
                },
                room: {
                    id: true,
                    name: true,
                    type: true,
                    theater_id: true,
                    theater: {
                        id: true,
                        name: true,
                        address: true,
                        location: true,
                        system_id: true
                    }
                }
            }
        });
        if (!showtime) {
            throw new NotFoundException(`Không tìm thấy lịch chiếu với ID ${id}`);
        }
        return showtime;
    }

    async updateShowtimeById(id: string, updateShowtimeDto: UpdateShowtimeDto): Promise<any> {
        // const showtime = await this.getShowtimeById(id);

        // const newRoomId = updateShowtimeDto.room_id || showtime.room_id;
        // const newStartTime = updateShowtimeDto.start_time || showtime.start_time;
        // const newEndTime = updateShowtimeDto.end_time || showtime.end_time;

        // await this.checkShowtimeConflict(newRoomId, newStartTime, newEndTime, id);

        // Object.assign(showtime, updateShowtimeDto);
        // return await this.showtimeRepository.save(showtime);
        return 1
    }

    async deleteShowtimeById(id: string): Promise<Showtime> {
        const showtime = await this.getShowtimeById(id);
        await this.showtimeRepository.delete(id);
        return showtime;
    }

    private async checkShowtimeConflict(room_id: string, start_time: Date, end_time: Date, excludeShowtimeId?: string): Promise<void> {
        const queryBuilder = this.showtimeRepository.createQueryBuilder('showtime');

        queryBuilder
            .where('showtime.room_id = :room_id', { room_id })
            .andWhere('showtime.start_time < :end_time', { end_time })
            .andWhere('showtime.end_time > :start_time', { start_time });

        if (excludeShowtimeId) {
            queryBuilder.andWhere('showtime.id != :excludeShowtimeId', { excludeShowtimeId });
        }

        const conflict = await queryBuilder.getOne();

        if (conflict) {
            throw new ConflictException(`Phòng này đã có lịch chiếu trong khoảng thời gian ${start_time} - ${end_time}`);
        }
    }
}
