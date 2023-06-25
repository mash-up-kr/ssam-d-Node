import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsService } from './keywords.service';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { MockKeywordRepository, MockUserKeywordrRepository, MockUserRepository } from 'test/mock/repositories';
import { ConfigModule } from '@nestjs/config';

describe('KeywordsService', () => {
  let service: KeywordsService;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let keywordRepository: KeywordRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        KeywordsService,
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: KeywordRepository, useValue: MockKeywordRepository() },
        { provide: UserKeywordRepository, useValue: MockUserKeywordrRepository() },
      ],
    }).compile();

    service = module.get<KeywordsService>(KeywordsService);
    keywordRepository = module.get(KeywordRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(keywordRepository).toBeDefined();
  });
});
