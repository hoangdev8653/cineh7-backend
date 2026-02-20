import { Controller } from '@nestjs/common';
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto, ORDER_CMD } from "@libs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @MessagePattern({ cmd: ORDER_CMD.GET_ALL })
    async getAllOrder() {
        const orders = await this.orderService.getAllOrder();
        return {
            message: "Lấy danh sách đơn hàng thành công",
            orders,
        };
    }

    @MessagePattern({ cmd: ORDER_CMD.GET_BY_ID })
    async getOrderById(@Payload() id: string) {
        const order = await this.orderService.getOrderById(id);
        return {
            message: "Lấy thông tin đơn hàng thành công",
            order,
        };
    }

    @MessagePattern({ cmd: ORDER_CMD.CREATE })
    async createOrder(@Payload() createOrderDto: CreateOrderDto) {
        const order = await this.orderService.createOrder(createOrderDto);
        return {
            message: "Tạo đơn hàng thành công",
            order,
        };
    }

    @MessagePattern({ cmd: ORDER_CMD.UPDATE })
    async updateOrderById(@Payload() data: { id: string, updateOrderDto: UpdateOrderDto }) {
        const order = await this.orderService.updateOrderById(data.id, data.updateOrderDto);
        return {
            message: "Cập nhật đơn hàng thành công",
            order,
        };
    }

    @MessagePattern({ cmd: ORDER_CMD.DELETE })
    async deleteOrderById(@Payload() id: string) {
        const orderDeleted = await this.orderService.deleteOrderById(id);
        return {
            message: "Xóa đơn hàng thành công",
            orderDeleted,
        };
    }
}