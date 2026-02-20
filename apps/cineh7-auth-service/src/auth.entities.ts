import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '@libs/common';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ name: 'full_name' })
    full_name: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({ default: true, name: 'is_active' })
    is_active: boolean;

    @Column({ name: 'refresh_token', nullable: true, type: 'varchar' })
    refresh_token: string | null;

    @Column({
        type: 'enum',
        enum: ['LOCAL', 'FACEBOOK', 'EMAIL'],
        default: 'LOCAL',
    })
    auth_method: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
