import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MovieTheaterServiceModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(MovieTheaterServiceModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
  await app.listen(process.env.MOVIE_THEATER_SERVICE_PORT ?? 3002);
  console.log(`Movie Theater Service is running on: http://localhost:${process.env.MOVIE_THEATER_SERVICE_PORT ?? 3002}`);
}
bootstrap();
