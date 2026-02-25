import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Order } from '../orders/order.entities'; // Ensure correct relative path

export enum TicketStatus {
    HELD = 'HELD', // Seat held, waiting for payment
    BOOKED = 'BOOKED', // Payment successful
    CANCELLED = 'CANCELLED', // Expired or user cancelled
}

@Entity('tickets')
// Partial unique index to prevent double booking active tickets
// Only allows ONE ticket for a specific seat in a showtime if status is HELD or BOOKED
@Index(['showtime_id', 'seat_id'], { where: "status IN ('HELD', 'BOOKED')" })
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, (order) => order.tickets, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column()
    showtime_id: string; // Ref: Movie Theater Service

    @Column()
    seat_id: string; // Ref: Movie Theater Service

    @Column()
    seat_name: string; // Snapshot: "A1", "B5" - For quick display

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number; // Snapshot price at booking time

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.HELD,
    })
    status: TicketStatus;

    @CreateDateColumn()
    created_at: Date;
}
