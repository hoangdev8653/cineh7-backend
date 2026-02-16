import { NestFactory } from '@nestjs/core';
import { Cineh7BookingServiceModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(Cineh7BookingServiceModule);
  await app.listen(process.env.BOOKING_SERVICE_PORT ?? 3003);
  console.log(`Booking Service is running on: http://localhost:${process.env.BOOKING_SERVICE_PORT ?? 3003}`);
}
bootstrap();
