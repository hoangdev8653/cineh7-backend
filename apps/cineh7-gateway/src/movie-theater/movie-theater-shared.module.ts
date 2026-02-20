import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'MOVIE_THEATER_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 3002,
                },
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class MovieTheaterSharedModule { }
