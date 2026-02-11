import { Injectable } from '@nestjs/common';

@Injectable()
export class H7GatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
