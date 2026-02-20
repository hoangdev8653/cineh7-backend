import { Controller, Get, Post, Body, Param, Delete, Put, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTicketDto, UpdateTicketDto, TICKET_CMD } from "@libs/common";

@Controller('ticket')
export class TicketController {
    constructor(@Inject('BOOKING_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    getAllTickets() {
        return this.client.send({ cmd: TICKET_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getTicketById(@Param('id') id: string) {
        return this.client.send({ cmd: TICKET_CMD.GET_BY_ID }, id);
    }

    @Post()
    createTicket(@Body() createTicketDto: CreateTicketDto) {
        return this.client.send({ cmd: TICKET_CMD.CREATE }, createTicketDto);
    }

    @Put(':id')
    updateTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
        return this.client.send({ cmd: TICKET_CMD.UPDATE }, { id, updateTicketDto });
    }

    @Delete(':id')
    deleteTicket(@Param('id') id: string) {
        return this.client.send({ cmd: TICKET_CMD.DELETE }, id);
    }
}
