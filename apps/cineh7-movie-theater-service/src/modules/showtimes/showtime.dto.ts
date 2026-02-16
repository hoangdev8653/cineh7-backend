import { IsNotEmpty, IsUUID, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateShowtimeDto {
    @IsNotEmpty()
    @IsUUID()
    movie_id: string;

    @IsNotEmpty()
    @IsUUID()
    room_id: string;

    @IsNotEmpty()
    @IsDateString()
    start_time: string;

    @IsOptional()
    @IsDateString()
    end_time: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}

export class UpdateShowtimeDto {
    @IsOptional()
    @IsUUID()
    movie_id?: string;

    @IsOptional()
    @IsUUID()
    room_id?: string;

    @IsOptional()
    @IsDateString()
    start_time?: Date;



    @IsOptional()
    @IsNumber()
    price?: number;
}

export class CreateBulkShowtimeDto {
    @IsNotEmpty()
    @IsUUID()
    movie_id: string;

    @IsNotEmpty()
    @IsUUID()
    room_id: string;

    @IsNotEmpty()
    @IsDateString()
    date: Date; // YYYY-MM-DD

    @IsNotEmpty()
    start_from: string; // HH:mm

    @IsNotEmpty()
    @IsNumber()
    repeat_count: number;

    @IsOptional()
    @IsNumber()
    cleanup_time: number = 15; // Phút

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
