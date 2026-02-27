import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateTheaterDto {
    @IsNotEmpty()
    @IsUUID()
    system_id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    image_url: string;
}

export class UpdateTheaterDto {
    @IsOptional()
    @IsUUID()
    system_id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    image_url?: string;
}
