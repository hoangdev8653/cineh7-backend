import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaymentStatus } from './order.entities';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @IsNotEmpty()
    @IsNumber()
    showtime_id: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    seat_ids: number[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsOptional()
    @IsEnum(PaymentStatus)
    payment_status?: PaymentStatus;
}
