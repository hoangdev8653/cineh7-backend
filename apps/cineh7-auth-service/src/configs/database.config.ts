import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const ConnectDbAuth: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        const dbConfig = {
            type: 'postgres' as const,
            host: configService.get<string>('DB_HOST_AUTH'),
            port: configService.get<number>('DB_PORT_AUTH'),
            username: configService.get<string>('DB_USERNAME_AUTH'),
            password: configService.get<string>('DB_PASSWORD_AUTH'),
            database: configService.get<string>('DB_NAME_AUTH'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: configService.get<string>('SYNCHRONIZE_AUTH') === 'true',
            autoLoadEntities: true,
        };
        console.log('--- Auth Service DB Config ---');
        console.log(`Host: ${dbConfig.host}`);
        console.log(`DB Name: ${dbConfig.database}`);
        console.log('------------------------------');
        return dbConfig;
    },
    inject: [ConfigService],
};