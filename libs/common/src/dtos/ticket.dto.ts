import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TicketStatus } from '../enums/booking.enum';

export class CreateTicketDto {
    @IsUUID()
    @IsNotEmpty()
    order_id: string;

    @IsNumber()
    @IsNotEmpty()
    showtime_id: number;

    @IsNumber()
    @IsNotEmpty()
    seat_id: number;

    @IsString()
    @IsNotEmpty()
    seat_name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class UpdateTicketDto {
    @IsOptional()
    @IsUUID()
    order_id?: string;

    @IsOptional()
    @IsNumber()
    showtime_id?: number;

    @IsOptional()
    @IsNumber()
    seat_id?: number;

    @IsOptional()
    @IsString()
    seat_name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;
}
