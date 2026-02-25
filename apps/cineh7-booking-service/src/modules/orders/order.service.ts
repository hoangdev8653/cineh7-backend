import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, PaymentStatus } from './order.entities';
import { CreateOrderDto, UpdateOrderDto, SHOWTIME_CMD } from '@libs/common';
import { Ticket, TicketStatus } from '../tickets/ticket.entities';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private dataSource: DataSource,
        @Inject('MOVIE_THEATER_SERVICE')
        private readonly movieTheaterClient: ClientProxy,
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
        console.log('Creating order for showtime:', createOrderDto.showtime_id);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const showtimeResponse = await firstValueFrom(
                this.movieTheaterClient.send({ cmd: SHOWTIME_CMD.GET_BY_ID }, createOrderDto.showtime_id)
            ).catch(err => {
                console.error('Error calling Movie Theater Service:', err);
                throw new BadRequestException('Không thể kết nối đến dịch vụ suất chiếu');
            });

            const showtime = showtimeResponse?.data;
            if (!showtime) {
                throw new NotFoundException(`Không tìm thấy thông tin suất chiếu với ID ${createOrderDto.showtime_id}`);
            }

            const pricePerTicket = showtime.price;
            const totalAmount = pricePerTicket * createOrderDto.seat_ids.length;

            const newOrder = new Order();
            newOrder.user_id = createOrderDto.user_id || '';
            newOrder.total_amount = totalAmount;
            newOrder.final_amount = totalAmount;
            newOrder.payment_status = PaymentStatus.PENDING;
            newOrder.expire_at = new Date(Date.now() + 10 * 60 * 1000);

            const savedOrder = await queryRunner.manager.save(Order, newOrder);

            const tickets: Ticket[] = [];
            for (const seatId of createOrderDto.seat_ids) {
                const ticket = new Ticket();
                ticket.order = savedOrder;
                ticket.showtime_id = createOrderDto.showtime_id;
                ticket.seat_id = seatId;
                ticket.seat_name = `Seat-${seatId}`;
                ticket.price = pricePerTicket;
                ticket.status = TicketStatus.HELD;
                tickets.push(ticket);
            }

            await queryRunner.manager.save(Ticket, tickets);

            await queryRunner.commitTransaction();

            return {
                ...savedOrder,
                tickets: tickets.map(t => {
                    const { order, ...ticketData } = t;
                    return ticketData;
                })
            };

        } catch (err) {
            await queryRunner.rollbackTransaction();
            console.error('Order Creation Error:', err);

            if (err.code === '23505') {
                return {
                    status: 'error',
                    message: 'Một hoặc nhiều ghế đã được đặt!'
                };
            }

            // Re-throw standardized error object for the filter
            throw err;
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