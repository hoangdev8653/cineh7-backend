import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterSystem } from './theater-system.entities';
import { TheaterSystemService } from './theater-system.service';
import { TheaterSystemController } from './theater-system.controller';
import { CloudinaryModule } from "../../../../../libs/cloudinary/src/cloudinary.module";
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../../../../libs/strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([TheaterSystem]),
        CloudinaryModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [TheaterSystemController],
    providers: [TheaterSystemService, JwtStrategy],
    exports: [TheaterSystemService]
})
export class TheaterSystemModule { }