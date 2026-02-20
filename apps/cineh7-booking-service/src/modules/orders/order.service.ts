import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, PaymentStatus } from './order.entities';
import { CreateOrderDto, UpdateOrderDto } from '@libs/common';
import { Ticket, TicketStatus } from '../tickets/ticket.entities';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private dataSource: DataSource,
    ) { }

    async getAllOrder(): Promise<Order[]> {
        return await this.orderRepository.find({ relations: ['tickets'] });
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['tickets'],
        });
        if (!order) {
            throw new NotFoundException(`Không tìm thấy đơn hàng với ID ${id}`);
        }
        return order;
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Giả lập tính toán giá tiền (Sau này gọi Service khác)
            const pricePerTicket = 50000;
            const totalAmount = pricePerTicket * createOrderDto.seat_ids.length;

            // 2. Tạo đối tượng Order (Chưa lưu DB ngay)
            // Lưu ý: Order không lưu showtime_id, chỉ Tickets lưu
            const newOrder = new Order();
            newOrder.user_id = createOrderDto.user_id;
            newOrder.total_amount = totalAmount;
            newOrder.final_amount = totalAmount;
            newOrder.payment_status = PaymentStatus.PENDING;
            newOrder.expire_at = new Date(Date.now() + 10 * 60 * 1000); // 10 phút hết hạn

            // 3. Lưu Order vào Transaction để lấy ID
            const savedOrder = await queryRunner.manager.save(Order, newOrder);

            // 4. Tạo các đối tượng Ticket tương ứng
            const tickets: Ticket[] = [];
            for (const seatId of createOrderDto.seat_ids) {
                const ticket = new Ticket();
                ticket.order = savedOrder; // Link với Order vừa tạo
                ticket.showtime_id = createOrderDto.showtime_id; // Lấy từ DTO
                ticket.seat_id = seatId;
                ticket.seat_name = `Seat-${seatId}`; // Demo snapshot
                ticket.price = pricePerTicket;
                ticket.status = TicketStatus.HELD;
                tickets.push(ticket);
            }

            // 5. Lưu danh sách Tickets vào Transaction
            await queryRunner.manager.save(Ticket, tickets);

            // 6. Commit (Chốt đơn)
            await queryRunner.commitTransaction();

            // Trả về kết quả đầy đủ
            return { ...savedOrder, tickets };

        } catch (err) {
            // Có lỗi (vd: trùng ghế) -> Rollback
            await queryRunner.rollbackTransaction();
            // Handle unique constraint violation (Double booking)
            if (err.code === '23505') { // Postgres unique_violation code
                throw new BadRequestException('Một hoặc nhiều ghế đã được đặt!');
            }
            console.error(err);
            throw new InternalServerErrorException('Lỗi khi tạo đơn hàng');
        } finally {
            await queryRunner.release();
        }
    }

    async updateOrderById(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.getOrderById(id);
        Object.assign(order, updateOrderDto);
        return await this.orderRepository.save(order);
    }

    async deleteOrderById(id: string): Promise<Order> {
        const result = await this.orderRepository.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException(`Không tìm thấy đơn hàng với ID ${id}`);
        }
        const orderDeleted = await this.orderRepository.remove(result);
        return orderDeleted;
    }
}