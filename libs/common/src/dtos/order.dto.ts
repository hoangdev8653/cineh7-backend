import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { PaymentStatus } from '../enums/booking.enum';

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

export class UpdateOrderDto {
    @IsOptional()
    @IsUUID()
    user_id?: string;

    @IsOptional()
    @IsNumber()
    showtime_id?: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    seat_ids?: number[];

    @IsOptional()
    @IsEnum(PaymentStatus)
    payment_status?: PaymentStatus;
}
