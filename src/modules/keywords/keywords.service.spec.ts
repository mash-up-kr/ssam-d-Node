import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsService } from './keywords.service';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { MockKeywordRepository, MockUserKeywordRepository, MockUserRepository } from 'test/mock/repositories';
import { ConfigModule } from '@nestjs/config';

describe('KeywordsService', () => {
  let keywordService: KeywordsService;
  let userRepository: UserRepository;
  let keywordRepository: KeywordRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        KeywordsService,
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: KeywordRepository, useValue: MockKeywordRepository() },
        { provide: UserKeywordRepository, useValue: MockUserKeywordRepository() },
      ],
    }).compile();

    keywordService = module.get(KeywordsService);
    userRepository = module.get(UserRepository);
    keywordRepository = module.get(KeywordRepository);
  });

  it('should be defined', () => {
    expect(keywordService).toBeDefined();
    expect(keywordRepository).toBeDefined();
  });
});
