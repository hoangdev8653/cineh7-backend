import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum NewsEventType {
    NEWS = 'news',
    EVENT = 'event',
    POLICY = 'policy',
}

@Entity('news_events')
export class NewsEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: NewsEventType,
        default: NewsEventType.NEWS,
    })
    type: NewsEventType;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    thumbnail: string;

    @Column('json')
    content: any;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}
