import {Test, TestingModule} from '@nestjs/testing';
import {SignalService} from './signal.service';
import {KeywordsService} from '../keywords/keywords.service';
import {
  ChatRepository,
  KeywordRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  TrashRepository,
  UserKeywordRepository,
  UserRepository,
} from 'src/repositories';
import {
  MockKeywordRepository,
  MockSignalRepository,
  MockTrashRepository,
  MockUserKeywordRepository,
  MockUserRepository,
} from 'test/mock/repositories';
import {ConfigModule} from '@nestjs/config';
import {MockRoomRepository} from "../../../test/mock/repositories/mock-room.repository";
import {MockRoomUserRepository} from "../../../test/mock/repositories/mock-room-user.repository";
import {MockChatRepository} from "../../../test/mock/repositories/mock-chat.repository";

describe('SignalService', () => {
  let signalService: SignalService;
  let keywordsService: KeywordsService;
  let signalRepository: ReturnType<typeof MockSignalRepository>;
  let trashRepository: ReturnType<typeof MockTrashRepository>;
  let roomRepository: ReturnType<typeof MockRoomRepository>;
  let roomUserRepository: ReturnType<typeof MockRoomUserRepository>;
  let chatRepository: ReturnType<typeof MockChatRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        SignalService,
        KeywordsService,
        { provide: SignalRepository, useValue: MockSignalRepository() },
        { provide: TrashRepository, useValue: MockTrashRepository() },
        { provide: RoomRepository, useValue: MockRoomRepository()},
        { provide: RoomUserRepository, useValue: MockRoomUserRepository()},
        { provide: ChatRepository, useValue: MockChatRepository()},
      ],
    }).compile();

    signalService = module.get<SignalService>(SignalService);
    keywordsService = module.get(KeywordsService);
    signalRepository = module.get(SignalRepository);
    trashRepository = module.get(TrashRepository);
    roomRepository = module.get(RoomRepository);
    roomUserRepository = module.get(RoomUserRepository);
    chatRepository = module.get(ChatRepository);

  });

  it('should be defined', () => {
    expect(signalService).toBeDefined();
    expect(signalRepository).toBeDefined();
    expect(trashRepository).toBeDefined();
    expect(keywordsService).toBeDefined();
    expect(roomRepository).toBeDefined()
    expect(roomUserRepository).toBeDefined()
    expect(chatRepository).toBeDefined()
  });
});
