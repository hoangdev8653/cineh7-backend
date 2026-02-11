import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    avatar?: string;
}

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
}

export class ProfileDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class LogoutDto {
    @IsNotEmpty()
    @IsString()
    refresh_token: string;
}



export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    new_password: string;
}

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    old_password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    new_password: string;
}