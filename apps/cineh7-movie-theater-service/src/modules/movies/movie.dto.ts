import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional, IsJSON } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    duration: number;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    release_date: Date;

    @IsOptional()
    @IsString()
    video_url?: string;

    @IsOptional()
    metadata?: any;
}

export class UpdateMovieDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    duration?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    release_date?: Date;

    @IsOptional()
    @IsString()
    video_url?: string;

    @IsOptional()
    metadata?: any;
}
