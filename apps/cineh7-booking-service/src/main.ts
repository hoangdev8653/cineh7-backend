import { NestFactory } from '@nestjs/core';
import { Cineh7BookingServiceModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { GlobalRpcExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Cineh7BookingServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.BOOKING_SERVICE_PORT ?? '3003'),
      },
    }
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
  console.log(`Booking Service is running on port: ${process.env.BOOKING_SERVICE_PORT ?? 3003}`);
}
bootstrap();
