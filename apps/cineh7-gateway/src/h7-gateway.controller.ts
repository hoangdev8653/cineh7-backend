import { Controller, Get } from '@nestjs/common';
import { H7GatewayService } from './h7-gateway.service';

@Controller()
export class H7GatewayController {
  constructor(private readonly h7GatewayService: H7GatewayService) {}

  @Get()
  getHello(): string {
    return this.h7GatewayService.getHello();
  }
}
