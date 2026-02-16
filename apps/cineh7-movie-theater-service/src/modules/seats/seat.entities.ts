import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from '../rooms/room.entities';

@Entity('seats')
export class Seat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    row: string; // A, B, C

    @Column()
    number: number; // 1, 2, 3

    @Column()
    type: string; // NORMAL, VIP, COUPLE

    @Column({ default: true })
    is_active: boolean;

    @Column({ name: 'room_id', type: 'uuid' })
    room_id: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room: Room;
}
