import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { H7GatewayController } from './h7-gateway.controller';
import { H7GatewayService } from './h7-gateway.service';
import { AuthModule } from './auth/auth.module';
import { MovieTheaterModule } from './movie-theater/movie-theater.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MovieTheaterModule,
    BookingModule,
  ],
  controllers: [H7GatewayController],
  providers: [H7GatewayService],
})
export class H7GatewayModule { }
