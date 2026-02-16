import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entities';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../../../../libs/strategies/jwt.strategy';
import { CloudinaryModule } from "../../../../../libs/cloudinary/src/cloudinary.module"

@Module({
    imports: [TypeOrmModule.forFeature([Movie]),
        CloudinaryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [MovieController],
    providers: [MovieService, JwtStrategy],
})
export class MovieModule { }
