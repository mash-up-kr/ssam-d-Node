import { Test, TestingModule } from '@nestjs/testing';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import {
  SignalRepository,
  TrashRepository,
  UserRepository,
  KeywordRepository,
  UserKeywordRepository,
} from 'src/repositories';
import {
  MockSignalRepository,
  MockTrashRepository,
  MockUserRepository,
  MockKeywordRepository,
  MockUserKeywordRepository,
} from 'test/mock/repositories';
import { ConfigModule } from '@nestjs/config';

describe('SignalService', () => {
  let signalService: SignalService;
  let keywordsService: KeywordsService;
  let signalRepository: ReturnType<typeof MockSignalRepository>;
  let trashRepository: ReturnType<typeof MockTrashRepository>;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let keyWordRepository: ReturnType<typeof MockKeywordRepository>;
  let userKeywordRepository: ReturnType<typeof MockUserKeywordRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        SignalService,
        KeywordsService,
        { provide: SignalRepository, useValue: MockSignalRepository() },
        { provide: TrashRepository, useValue: MockTrashRepository() },
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: KeywordRepository, useValue: MockKeywordRepository() },
        { provide: UserKeywordRepository, useValue: MockUserKeywordRepository() },
      ],
    }).compile();

    signalService = module.get<SignalService>(SignalService);
    keywordsService = module.get(KeywordsService);
    signalRepository = module.get(SignalRepository);
    trashRepository = module.get(TrashRepository);
    userRepository = module.get(UserRepository);
    keyWordRepository = module.get(KeywordRepository);
    userKeywordRepository = module.get(UserKeywordRepository);
  });

  it('should be defined', () => {
    expect(signalService).toBeDefined();
    expect(signalRepository).toBeDefined();
    expect(trashRepository).toBeDefined();
    expect(keywordsService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(keyWordRepository).toBeDefined();
    expect(userKeywordRepository).toBeDefined();
  });
});
