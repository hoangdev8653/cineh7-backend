import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Theater } from '../theaters/theater.entities';

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string; // 2D, 3D, IMAX

    @Column({ default: 100 })
    total_seats: number;

    @Column({ name: 'theater_id', type: 'uuid' })
    theater_id: string;

    @ManyToOne(() => Theater)
    @JoinColumn({ name: 'theater_id' })
    theater: Theater;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
