import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { MockKeywordRepository, MockUserKeywordrRepository, MockUserRepository } from 'test/mock/repositories';
import { KeywordsService } from '../keywords/keywords.service';
import { UserNotFoundException } from 'src/exceptions';
import { userDataObject } from 'test/mock/data/user.data.mock';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let userKeywordRepository: ReturnType<typeof MockUserKeywordrRepository>;
  let keywordRepository: ReturnType<typeof MockKeywordRepository>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: UserKeywordRepository, useValue: MockUserKeywordrRepository() },
        { provide: KeywordRepository, useValue: MockKeywordRepository() },
        {
          provide: KeywordsService,
          useFactory: keywordRepository => new KeywordsService(keywordRepository),
          inject: [KeywordRepository],
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(UserRepository);
    userKeywordRepository = module.get(UserKeywordRepository);
    keywordRepository = module.get(KeywordRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userKeywordRepository).toBeDefined();
    expect(keywordRepository).toBeDefined();
  });

  describe('알람수신 동의 API', () => {
    it('존재하지 않는 유저의 경우 예외 Throw', async () => {
      userRepository.get.mockResolvedValue(null);
      const userId = 1,
        agreeAlarm = true;
      try {
        await service.updateAgreeAlarm(userId, agreeAlarm);
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('유저 삭제 API', () => {
    it('존재하지 않는 유저의 경우 예외 Throw', async () => {
      userRepository.get.mockResolvedValue(null);
      const userId = 1;
      await expect(service.deleteById(userId)).rejects.toBeInstanceOf(UserNotFoundException);
    });
    it('유저 정상 삭제', async () => {
      const userId = 1;
      const res = await service.deleteById(userId);
      expect(res).toEqual(undefined);
    });
  });
});
