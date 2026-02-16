import { Test, TestingModule } from '@nestjs/testing';
import { MovieTheaterServiceController } from './app.controller';
import { MovieTheaterServiceService } from './app.service';

describe('MovieTheaterServiceController', () => {
  let movieTheaterServiceController: MovieTheaterServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieTheaterServiceController],
      providers: [MovieTheaterServiceService],
    }).compile();

    movieTheaterServiceController = app.get<MovieTheaterServiceController>(MovieTheaterServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(movieTheaterServiceController.getHello()).toBe('Hello World!');
    });
  });
});
