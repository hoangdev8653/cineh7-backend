import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { OrderService } from "./order.service"
import { CreateOrderDto, UpdateOrderDto } from "./order.dto"
import { TicketService } from '../tickets/ticket.service';

@Controller("order")
export class OrderController {
    constructor(private readonly orderService: OrderService, private readonly ticketService: TicketService) { }

    @Get()
    async getAllOrder() {
        const orders = await this.orderService.getAllOrder();
        return {
            message: "Lấy danh sách đơn hàng thành công",
            orders,
        }
    }

    @Get(":id")
    async getOrderById(@Param("id", ParseUUIDPipe) id: string) {
        const order = await this.orderService.getOrderById(id);
        return {
            message: "Lấy thông tin đơn hàng thành công",
            order,
        }
    }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.orderService.createOrder(createOrderDto);
        return {
            message: "Tạo đơn hàng thành công",
            order,
        }
    }

    @Put(":id")
    async updateOrderById(@Param("id", ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
        const order = await this.orderService.updateOrderById(id, updateOrderDto);
        return {
            message: "Cập nhật đơn hàng thành công",
            order,
        }
    }

    @Delete(":id")
    async deleteOrderById(@Param("id", ParseUUIDPipe) id: string) {
        const orderDeleted = await this.orderService.deleteOrderById(id);
        return {
            message: "Xóa đơn hàng thành công",
            orderDeleted,
        }
    }
}