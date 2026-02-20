import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSeatDto {
    @IsNotEmpty()
    @IsNumber()
    rows: number;

    @IsNotEmpty()
    @IsNumber()
    columns: number;

    @IsOptional()
    @IsString()
    type: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsNotEmpty()
    @IsUUID()
    room_id: string;
}

export class UpdateSeatDto extends PartialType(CreateSeatDto) { }

