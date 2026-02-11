import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { H7GatewayController } from './h7-gateway.controller';
import { H7GatewayService } from './h7-gateway.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [H7GatewayController],
  providers: [H7GatewayService],
})
export class H7GatewayModule { }
