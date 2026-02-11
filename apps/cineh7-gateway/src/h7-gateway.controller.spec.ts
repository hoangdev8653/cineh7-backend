import { Test, TestingModule } from '@nestjs/testing';
import { H7GatewayController } from './h7-gateway.controller';
import { H7GatewayService } from './h7-gateway.service';

describe('H7GatewayController', () => {
  let h7GatewayController: H7GatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [H7GatewayController],
      providers: [H7GatewayService],
    }).compile();

    h7GatewayController = app.get<H7GatewayController>(H7GatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(h7GatewayController.getHello()).toBe('Hello World!');
    });
  });
});
