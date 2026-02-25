import { Controller, Get, Post, Body, Param, Delete, Put, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, UpdateOrderDto, ORDER_CMD } from "@libs/common";
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

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

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @CurrentUser() user: any
    ) {
        createOrderDto.user_id = user.userId;
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
