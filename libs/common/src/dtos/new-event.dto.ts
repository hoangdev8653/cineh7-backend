import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { NewsEventType } from '../enums/new-event.enum';

export class CreateNewsEventDto {
    @IsEnum(NewsEventType)
    @IsNotEmpty()
    type: NewsEventType;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @IsNotEmpty()
    content: any;


    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

export class UpdateNewsEventDto extends PartialType(CreateNewsEventDto) { }

export class FilterNewsEventDto {
    @IsEnum(NewsEventType)
    @IsOptional()
    type?: NewsEventType;

    @IsOptional()
    is_active?: string;

    @IsString()
    @IsOptional()
    search?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
