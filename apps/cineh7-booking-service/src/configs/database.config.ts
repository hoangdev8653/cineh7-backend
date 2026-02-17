import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ConnectDbBooking: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST_BOOKING'),
        port: configService.get<number>('DB_PORT_BOOKING'),
        username: configService.get<string>('DB_USERNAME_BOOKING'),
        password: configService.get<string>('DB_PASSWORD_BOOKING'),
        database: configService.get<string>('DB_NAME_BOOKING'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('SYNCHRONIZE_BOOKING') === 'true',
        autoLoadEntities: true,
    }),
    inject: [ConfigService],
};
