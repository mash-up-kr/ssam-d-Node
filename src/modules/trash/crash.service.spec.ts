import { Test, TestingModule } from '@nestjs/testing';
import { CrashService } from './crash.service';
import { CrashRepository } from 'src/repositories';
import { MockCrashRepository } from 'test/mock/repositories';

describe('CrashService', () => {
  let service: CrashService;
  let trashRepository: ReturnType<typeof MockCrashRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrashService, { provide: CrashRepository, useValue: MockCrashRepository() }],
    }).compile();

    service = module.get<CrashService>(CrashService);
    trashRepository = module.get(CrashRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(trashRepository).toBeDefined();
  });
});
