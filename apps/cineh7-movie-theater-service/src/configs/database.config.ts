import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ConnectDbMovieTheater: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST_MOVIE_THEATER'),
        port: configService.get<number>('DB_PORT_MOVIE_THEATER'),
        username: configService.get<string>('DB_USERNAME_MOVIE_THEATER'),
        password: configService.get<string>('DB_PASSWORD_MOVIE_THEATER'),
        database: configService.get<string>('DB_NAME_MOVIE_THEATER'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('SYNCHRONIZE_MOVIE_THEATER') === 'true',
        autoLoadEntities: true,
    }),
    inject: [ConfigService],
};
