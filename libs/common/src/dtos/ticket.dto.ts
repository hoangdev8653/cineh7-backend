import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TicketStatus } from '../enums/booking.enum';

export class CreateTicketDto {
    @IsUUID()
    @IsNotEmpty()
    order_id: string;

    @IsString()
    @IsNotEmpty()
    showtime_id: string;

    @IsString()
    @IsNotEmpty()
    seat_id: string;

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
    @IsString()
    showtime_id?: string;

    @IsOptional()
    @IsString()
    seat_id?: string;

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
