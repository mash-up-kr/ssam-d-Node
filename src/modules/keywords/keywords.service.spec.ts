import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsService } from './keywords.service';
import { KeywordRepository } from 'src/repositories';
import { MockKeywordRepository } from 'test/mock/repositories';

describe('KeywordsService', () => {
  let service: KeywordsService;
  let keywordRepository: KeywordRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordsService, { provide: KeywordRepository, useValue: MockKeywordRepository() }],
    }).compile();

    service = module.get<KeywordsService>(KeywordsService);
    keywordRepository = module.get(KeywordRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(keywordRepository).toBeDefined();
  });
});
