import { NestFactory } from '@nestjs/core';
import { H7GatewayModule } from './h7-gateway.module';
import { GlobalHttpExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.create(H7GatewayModule);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  await app.listen(process.env.GATEWAY_PORT ?? 3000);
  console.log(`H7 Gateway is running on: http://localhost:${process.env.GATEWAY_PORT ?? 3000}`);
}
bootstrap();
