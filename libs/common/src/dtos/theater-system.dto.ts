import { IsNotEmpty, IsString } from "class-validator";

export class CreateTheaterSystemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    logo: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class UpdateTheaterSystemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    logo: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
