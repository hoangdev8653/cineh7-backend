import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TheaterSystem } from '../theater-systems/theater-system.entities';

@Entity('theaters')
export class Theater {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'system_id', type: 'uuid' })
    system_id: string;

    @ManyToOne(() => TheaterSystem)
    @JoinColumn({ name: 'system_id' })
    system: TheaterSystem;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ comment: 'Tỉnh/Thành phố' })
    location: string;

    @Column({ nullable: true })
    image_url: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}
