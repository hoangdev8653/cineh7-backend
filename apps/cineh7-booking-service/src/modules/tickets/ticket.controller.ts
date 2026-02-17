import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    async getAllTickets() {
        const tickets = await this.ticketService.getAllTickets();
        return {
            message: 'Lấy danh sách vé thành công',
            data: tickets,
        };
    }

    @Get(':id')
    async getTicketById(@Param('id', ParseUUIDPipe) id: string) {
        const ticket = await this.ticketService.getTicketById(id);
        return {
            message: 'Lấy thông tin vé thành công',
            data: ticket,
        };
    }

    // Note: Tickets are usually created via Orders, but this endpoint is here for admin/testing
    @Post()
    async createTicket(@Body() createTicketDto: CreateTicketDto) {
        const ticket = await this.ticketService.createTicket(createTicketDto);
        return {
            message: 'Tạo vé thành công',
            data: ticket,
        };
    }

    @Put(':id')
    async updateTicket(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTicketDto: UpdateTicketDto,
    ) {
        const ticket = await this.ticketService.updateTicket(id, updateTicketDto);
        return {
            message: 'Cập nhật vé thành công',
            data: ticket,
        };
    }

    @Delete(':id')
    async deleteTicket(@Param('id', ParseUUIDPipe) id: string) {
        await this.ticketService.deleteTicket(id);
        return {
            message: 'Xóa vé thành công',
        };
    }
}
