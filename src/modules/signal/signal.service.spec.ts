import { Test, TestingModule } from '@nestjs/testing';
import { SignalService } from './signal.service';
import { SignalRepository, TrashRepository, KeywordRepository, UserKeywordRepository } from 'src/repositories';
import { MockSignalRepository } from 'test/mock/repositories';

describe('SignalService', () => {
  let service: SignalService;
  let signalRepository: ReturnType<typeof MockSignalRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalService, { provide: SignalRepository, useValue: MockSignalRepository() }],
    }).compile();

    service = module.get<SignalService>(SignalService);
    signalRepository = module.get(SignalRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
