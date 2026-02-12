import { NestFactory } from '@nestjs/core';
import { Cineh7MovieTheaterServiceModule } from './cineh7-movie-theater-service.module';

async function bootstrap() {
  const app = await NestFactory.create(Cineh7MovieTheaterServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
