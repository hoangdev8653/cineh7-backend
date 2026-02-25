import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entities';
import { CreateTicketDto, UpdateTicketDto } from '@libs/common';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,
    ) { }

    async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketRepository.find({ relations: ['order'] });
    }

    async getTicketById(id: string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({ where: { id }, relations: ['order'] });
        if (!ticket) {
            throw new NotFoundException(`Không tìm thấy vé với ID ${id}`);
        }
        return ticket;
    }

    async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const ticket = this.ticketRepository.create(createTicketDto);
        // Note: ensure order_id is valid handled by FK constraint or service logic
        return await this.ticketRepository.save(ticket);
    }

    async updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
        const ticket = await this.getTicketById(id);
        Object.assign(ticket, updateTicketDto);
        return await this.ticketRepository.save(ticket);
    }

    async deleteTicket(id: string): Promise<void> {
        const ticket = await this.getTicketById(id);
        await this.ticketRepository.remove(ticket);
    }
}
