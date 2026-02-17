import { Test, TestingModule } from '@nestjs/testing';
import { Cineh7BookingServiceController } from './app.controller';
import { Cineh7BookingService } from './app.service';

describe('Cineh7BookingServiceController', () => {
  let cineh7BookingServiceController: Cineh7BookingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Cineh7BookingServiceController],
      providers: [Cineh7BookingService],
    }).compile();

    cineh7BookingServiceController = app.get<Cineh7BookingServiceController>(Cineh7BookingServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cineh7BookingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
