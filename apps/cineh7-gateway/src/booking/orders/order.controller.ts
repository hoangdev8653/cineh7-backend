import { Controller, Get, Post, Body, Param, Delete, Put, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, UpdateOrderDto, ORDER_CMD } from "@libs/common";

@Controller('order')
export class OrderController {
    constructor(@Inject('BOOKING_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    getAllOrders() {
        return this.client.send({ cmd: ORDER_CMD.GET_ALL }, {});
    }

    @Get(':id')
    getOrderById(@Param('id') id: string) {
        return this.client.send({ cmd: ORDER_CMD.GET_BY_ID }, id);
    }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.client.send({ cmd: ORDER_CMD.CREATE }, createOrderDto);
    }

    @Put(':id')
    updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.client.send({ cmd: ORDER_CMD.UPDATE }, { id, updateOrderDto });
    }

    @Delete(':id')
    deleteOrder(@Param('id') id: string) {
        return this.client.send({ cmd: ORDER_CMD.DELETE }, id);
    }
}
