import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto, TICKET_CMD } from '@libs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @MessagePattern({ cmd: TICKET_CMD.GET_ALL })
    async getAllTickets() {
        const tickets = await this.ticketService.getAllTickets();
        return {
            message: 'Lấy danh sách vé thành công',
            data: tickets,
        };
    }

    @MessagePattern({ cmd: TICKET_CMD.GET_BY_ID })
    async getTicketById(@Payload() id: string) {
        const ticket = await this.ticketService.getTicketById(id);
        return {
            message: 'Lấy thông tin vé thành công',
            data: ticket,
        };
    }

    @MessagePattern({ cmd: TICKET_CMD.CREATE })
    async createTicket(@Payload() createTicketDto: CreateTicketDto) {
        const ticket = await this.ticketService.createTicket(createTicketDto);
        return {
            message: 'Tạo vé thành công',
            data: ticket,
        };
    }

    @MessagePattern({ cmd: TICKET_CMD.UPDATE })
    async updateTicket(@Payload() data: { id: string, updateTicketDto: UpdateTicketDto }) {
        const ticket = await this.ticketService.updateTicket(data.id, data.updateTicketDto);
        return {
            message: 'Cập nhật vé thành công',
            data: ticket,
        };
    }

    @MessagePattern({ cmd: TICKET_CMD.DELETE })
    async deleteTicket(@Payload() id: string) {
        await this.ticketService.deleteTicket(id);
        return {
            message: 'Xóa vé thành công',
        };
    }
}
