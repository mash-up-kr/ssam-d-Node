import { Test, TestingModule } from '@nestjs/testing';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalReqDto } from './dto/signal-req-dto';
import { UserKeyword } from 'src/domains/user-keyword';
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
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('SignalService', () => {
  let signalService: SignalService;
  let keywordsService: KeywordsService;
  let signalRepository: ReturnType<typeof MockSignalRepository>;
  let trashRepository: ReturnType<typeof MockTrashRepository>;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let keyWordRepository: ReturnType<typeof MockKeywordRepository>;
  let userKeywordRepository: ReturnType<typeof MockUserKeywordRepository>;
  let configSpy: jest.SpyInstance;
  let configService: ConfigService;

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
  describe('시그널 전송 테스트', () => {});
  it('일치하는 유저가가 없을 경우 Trash에 저장해야 한다.', async () => {
    const senderId = 1;
    const signalReqDto: SignalReqDto = {
      keywords: ['수상스키', '파인애플'],
      content: '파인애플먹고 수상스키타자',
    };
    const matchingInfo = [];

    jest.spyOn(keywordsService, 'matchingUserByKeywords').mockResolvedValue([]);
    jest.spyOn(trashRepository, 'save').mockResolvedValue(Promise.resolve());
    await signalService.sendSignal(senderId, signalReqDto);

    expect(keywordsService.matchingUserByKeywords).toHaveBeenCalledWith(senderId, signalReqDto.keywords);
    expect(trashRepository.save).toHaveBeenCalledWith({
      userId: senderId,
      keywords: signalReqDto.keywords.join(','),
      content: signalReqDto.content,
    });
  });
  it('키워드가 일치하는 유저의 시그널을 저장해야함', async () => {
    /**
     * given
     */
    const senderId = 1;
    const signalReqDto: SignalReqDto = {
      keywords: ['치킨', '떡볶이', '캠핑', '가족여행', '하늘공원'],
      content: '하늘공원으로 캠핑갔다왔다. 거기서 치킨하고 떡볶이 먹음. 꿀맛이였음 ',
    };

    const matchingInfo = [
      new UserKeyword({ id: 2, keywords: '치킨,떡볶이' }),
      new UserKeyword({ id: 3, keywords: '하늘공원' }),
    ];

    jest.spyOn(keywordsService, 'matchingUserByKeywords').mockResolvedValue(matchingInfo);

    jest.spyOn(signalRepository, 'save').mockResolvedValue(Promise.resolve());

    await signalService.sendSignal(senderId, signalReqDto);

    expect(keywordsService.matchingUserByKeywords).toHaveBeenCalledWith(senderId, signalReqDto.keywords);
    expect(signalRepository.save).toHaveBeenCalledWith([
      {
        senderId: senderId,
        receiverId: 2,
        keywords: matchingInfo[0].keywords,
        content: signalReqDto.content,
      },
      {
        senderId: senderId,
        receiverId: 3,
        keywords: matchingInfo[1].keywords,
        content: signalReqDto.content,
      },
    ]);
  });
});
