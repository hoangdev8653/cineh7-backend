import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TicketStatus } from './ticket.entities';

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

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;
}
