import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Ticket } from '../tickets/ticket.entities'; // Assuming Ticket entity is in a sibling 'tickets' module

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED',
    FAILED = 'FAILED',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' }) // User ID from Auth Service
    user_id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount: number; // Original price

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    discount_amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    final_amount: number; // usage: total_amount - discount_amount

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    payment_status: PaymentStatus;

    @Column({ nullable: true })
    payment_method: string; // VNPAY, MOMO, etc.

    @Column({ nullable: true })
    transaction_id: string; // From Gateway

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'timestamp' })
    expire_at: Date; // Important for auto-canceling

    @Column({ nullable: true })
    paid_at: Date;

    @OneToMany(() => Ticket, (ticket) => ticket.order, { cascade: true })
    tickets: Ticket[];
}
