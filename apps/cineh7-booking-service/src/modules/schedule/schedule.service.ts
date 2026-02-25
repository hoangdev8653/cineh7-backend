import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, PaymentStatus } from '../orders/order.entities';
import { In, LessThan, Repository } from 'typeorm';
import { Ticket, TicketStatus } from '../tickets/ticket.entities';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,
    ) { }
    private readonly logger = new Logger(TasksService.name);

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCheckExpiredOrder() {
        const expiredOrders = await this.orderRepository.find({
            where: {
                payment_status: PaymentStatus.PENDING,
                expire_at: LessThan(new Date()),
            },
        });

        if (expiredOrders.length === 0) {
            console.log("Không có đơn hàng hết hạn ✅");
            return;
        }
        const expiredOrderIds = expiredOrders.map(o => o.id);
        console.log(`Đang xử lý hủy ${expiredOrders.length} đơn hàng...`);
        const updateStatusOrder = await this.orderRepository.update(expiredOrderIds, {
            payment_status: PaymentStatus.CANCELLED,
        })
        console.log(`Cập nhật trạng thái ${updateStatusOrder.affected} đơn hàng`);
        const updateStatusTicket = await this.ticketRepository.update({ order: { id: In(expiredOrderIds) } }, {
            status: TicketStatus.CANCELLED
        })
        console.log(`Cập nhật trạng thái ${updateStatusTicket.affected} vé`);
    }

    @Cron('0 2 * * *')
    handleDailyBackup() {
        this.logger.debug('Đang thực hiện backup dữ liệu vào 2h sáng');
    }
}