import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GlobalRpcExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.AUTH_SERVICE_PORT || '3001'),
      },
    },
  );
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
  console.log(`Auth service is running on port: ${process.env.AUTH_SERVICE_PORT || 3001}`);
}
bootstrap();

