import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { Theater } from './theater.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Theater])],
    controllers: [TheaterController],
    providers: [TheaterService],
    exports: [TheaterService],
})
export class TheaterModule { }
