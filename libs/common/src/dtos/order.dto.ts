import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaymentStatus } from '../enums/booking.enum';

export class CreateOrderDto {
    @IsOptional()
    @IsUUID()
    user_id?: string;

    @IsNotEmpty()
    @IsString()
    showtime_id: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    seat_ids: string[];
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
    @IsString({ each: true })
    seat_ids?: string[];

    @IsOptional()
    @IsEnum(PaymentStatus)
    payment_status?: PaymentStatus;
}
