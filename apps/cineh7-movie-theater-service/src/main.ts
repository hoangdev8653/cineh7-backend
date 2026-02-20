import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MovieTheaterServiceModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GlobalRpcExceptionFilter } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MovieTheaterServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.MOVIE_THEATER_SERVICE_PORT ?? '3002'),
      },
    }
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
  console.log(`Movie Theater Service is running on port: ${process.env.MOVIE_THEATER_SERVICE_PORT ?? 3002}`);
}
bootstrap();
