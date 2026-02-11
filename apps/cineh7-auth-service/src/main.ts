import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(process.env.AUTH_SERVICE_PORT ?? 3001);
  console.log(`Auth service is running on: http://localhost:${process.env.AUTH_SERVICE_PORT ?? 3001}`);
}
bootstrap();
