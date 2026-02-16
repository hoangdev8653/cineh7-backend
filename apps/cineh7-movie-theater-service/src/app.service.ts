import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieTheaterServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
