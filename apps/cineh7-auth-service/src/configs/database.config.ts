import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ConnectDbAuth: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST_AUTH'),
        port: configService.get<number>('DB_PORT_AUTH'),
        username: configService.get<string>('DB_USERNAME_AUTH'),
        password: configService.get<string>('DB_PASSWORD_AUTH'),
        database: configService.get<string>('DB_NAME_AUTH'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('SYNCHRONIZE_AUTH') === 'true',
        autoLoadEntities: true,
    }),
    inject: [ConfigService],
};