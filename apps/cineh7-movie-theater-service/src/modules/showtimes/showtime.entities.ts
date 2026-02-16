import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from '../movies/movie.entities';
import { Room } from '../rooms/room.entities';

@Entity('showtimes')
export class Showtime {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'movie_id', type: 'uuid' }) // Movie still uses UUID
    movie_id: string;

    @ManyToOne(() => Movie)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;

    @Column({ name: 'room_id', type: 'uuid' })
    room_id: string;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @Column({ type: 'timestamp' })
    end_time: Date;

    @Column({ default: 'SCHEDULED' }) // SCHEDULED, OPENING, CLOSED, CANCELLED
    status: string;


    @Column({ type: 'decimal' })
    price: number;

    @CreateDateColumn()
    created_at: Date;
}
