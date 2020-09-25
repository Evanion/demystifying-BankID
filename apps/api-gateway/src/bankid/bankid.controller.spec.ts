import { Test, TestingModule } from '@nestjs/testing';
import { BankidController } from './bankid.controller';

describe('BankidController', () => {
  let controller: BankidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankidController],
    }).compile();

    controller = module.get<BankidController>(BankidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
