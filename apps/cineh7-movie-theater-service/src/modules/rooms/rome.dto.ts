import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsNumber()
    total_seats: number;

    @IsNotEmpty()
    @IsString()
    theater_id: string;
}



export class UpdateRoomDto extends PartialType(CreateRoomDto) { }
