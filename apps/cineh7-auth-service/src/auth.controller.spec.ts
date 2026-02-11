import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { beforeEach, describe, it } from 'node:test';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "AUTH SERVICE IS RUNNING!"', () => {
      expect(authController.getHello()).toBe('AUTH SERVICE IS RUNNING!');
    });
  });
});
