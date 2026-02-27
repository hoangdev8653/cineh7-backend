import { Controller, Get, Post, Body, Param, Delete, Patch, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateShowtimeDto, UpdateShowtimeDto, CreateBulkShowtimeDto, SHOWTIME_CMD, SEAT_CMD, TICKET_CMD } from "@libs/common";
import { firstValueFrom } from 'rxjs';

@Controller('showtime')
export class ShowtimeController {
    constructor(
        @Inject('MOVIE_THEATER_SERVICE') private readonly movieClient: ClientProxy,
        @Inject('BOOKING_SERVICE') private readonly bookingClient: ClientProxy,
    ) { }

    @Post()
    createShowtime(@Body() createShowtimeDto: CreateShowtimeDto) {
        return this.movieClient.send({ cmd: SHOWTIME_CMD.CREATE }, createShowtimeDto);
    }

    @Post('bulk')
    createBulkShowtimes(@Body() createBulkDto: CreateBulkShowtimeDto) {
        return this.movieClient.send({ cmd: 'create_bulk_showtimes' }, createBulkDto);
    }

    @Get()
    getAllShowtimes() {
        return this.movieClient.send({ cmd: SHOWTIME_CMD.GET_ALL }, {});
    }

    @Get('grouped')
    getGroupedShowtimes(@Query('movie_id') movie_id?: string, @Query('theater_id') theater_id?: string) {
        return this.movieClient.send({ cmd: SHOWTIME_CMD.GET_GROUPED }, { movie_id, theater_id });
    }

    @Get(':id')
    getShowtimeById(@Param('id') id: string) {
        return this.movieClient.send({ cmd: SHOWTIME_CMD.GET_BY_ID }, id);
    }

    @Get(':id/seats')
    async getShowtimeSeats(@Param('id') id: string) {
        // 1. Get showtime details to find room_id
        const showtimeRes = await firstValueFrom(this.movieClient.send({ cmd: SHOWTIME_CMD.GET_BY_ID }, id));
        const showtime = showtimeRes.data;

        if (!showtime) return showtimeRes;

        const roomId = showtime.room_id;

        // 2. Get all seats for that room from movie-theater-service
        const seatsRes = await firstValueFrom(this.movieClient.send({ cmd: SEAT_CMD.GET_ALL }, {}));
        // Filter seats for this room
        const allSeats = seatsRes.filter((s: any) => s.room_id === roomId);

        // 3. Get all booked/held tickets for this showtime from booking-service
        const ticketsRes = await firstValueFrom(this.bookingClient.send({ cmd: TICKET_CMD.GET_BOOKED_BY_SHOWTIME }, id));
        const bookedTickets = ticketsRes.data || [];

        // 4. Merge data: So sánh number (Seat) với seat_id (Ticket) theo yêu cầu của user
        const mergedSeats = allSeats.map((seat: any) => {
            const ticket = bookedTickets.find((t: any) => Number(t.seat_id) === seat.number);
            return {
                ...seat,
                status: ticket ? ticket.status : 'AVAILABLE'
            };
        });

        return {
            message: 'Lấy trạng thái ghế thành công',
            data: mergedSeats
        };
    }

    @Patch(':id')
    updateShowtimeById(@Param('id') id: string, @Body() updateShowtimeDto: UpdateShowtimeDto) {
        return this.movieClient.send({ cmd: SHOWTIME_CMD.UPDATE }, { id, updateShowtimeDto });
    }

    @Delete(':id')
    deleteShowtimeById(@Param('id') id: string) {
        return this.movieClient.send({ cmd: SHOWTIME_CMD.DELETE }, id);
    }
}
