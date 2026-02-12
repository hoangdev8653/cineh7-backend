import { Test, TestingModule } from '@nestjs/testing';
import { Cineh7MovieTheaterServiceController } from './cineh7-movie-theater-service.controller';
import { Cineh7MovieTheaterServiceService } from './cineh7-movie-theater-service.service';

describe('Cineh7MovieTheaterServiceController', () => {
  let cineh7MovieTheaterServiceController: Cineh7MovieTheaterServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Cineh7MovieTheaterServiceController],
      providers: [Cineh7MovieTheaterServiceService],
    }).compile();

    cineh7MovieTheaterServiceController = app.get<Cineh7MovieTheaterServiceController>(Cineh7MovieTheaterServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cineh7MovieTheaterServiceController.getHello()).toBe('Hello World!');
    });
  });
});
