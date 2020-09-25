import { Test, TestingModule } from '@nestjs/testing';
import { BankidService } from './bankid.service';

describe('BankidService', () => {
  let service: BankidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankidService],
    }).compile();

    service = module.get<BankidService>(BankidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
