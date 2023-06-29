import { Test, TestingModule } from '@nestjs/testing';
import { TrashService } from './trash.service';
import { TrashRepository } from 'src/repositories';
import { MockTrashRepository } from 'test/mock/repositories';

describe('TrashService', () => {
  let service: TrashService;
  let trashRepository: ReturnType<typeof MockTrashRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashService, { provide: TrashRepository, useValue: MockTrashRepository() }],
    }).compile();

    service = module.get<TrashService>(TrashService);
    trashRepository = module.get(TrashRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(trashRepository).toBeDefined();
  });
});
