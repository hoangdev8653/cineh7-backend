import { NestFactory } from '@nestjs/core';
import { H7GatewayModule } from './h7-gateway.module';
import { GlobalHttpExceptionFilter } from '@libs/common';
import { corsConfig } from '../../configs/corsConfig';

async function bootstrap() {
  const app = await NestFactory.create(H7GatewayModule);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.enableCors(corsConfig);
  await app.listen(process.env.GATEWAY_PORT ?? 3000);
  console.log(
    `H7 Gateway is running on: http://localhost:${process.env.GATEWAY_PORT ?? 3000}`,
  );
}
bootstrap();
