import { Test, TestingModule } from '@nestjs/testing';
import { SignalService } from './signal.service';
import {
  ChatRepository,
  CrashRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  UserKeywordRepository,
  UserRepository,
} from 'src/repositories';
import {
  MockCrashRepository,
  MockSignalRepository,
  MockUserKeywordRepository,
  MockUserRepository,
} from 'test/mock/repositories';
import { ConfigModule } from '@nestjs/config';
import { MockRoomRepository } from '../../../test/mock/repositories/mock-room.repository';
import { MockRoomUserRepository } from '../../../test/mock/repositories/mock-room-user.repository';
import { MockChatRepository } from '../../../test/mock/repositories/mock-chat.repository';

describe('SignalService', () => {
  let signalService: SignalService;
  let signalRepository: ReturnType<typeof MockSignalRepository>;
  let trashRepository: ReturnType<typeof MockCrashRepository>;
  let roomRepository: ReturnType<typeof MockRoomRepository>;
  let roomUserRepository: ReturnType<typeof MockRoomUserRepository>;
  let chatRepository: ReturnType<typeof MockChatRepository>;
  let userRepository: ReturnType<typeof MockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        SignalService,
        { provide: UserKeywordRepository, useValue: MockUserKeywordRepository() },
        { provide: SignalRepository, useValue: MockSignalRepository() },
        { provide: CrashRepository, useValue: MockCrashRepository() },
        { provide: RoomRepository, useValue: MockRoomRepository() },
        { provide: RoomUserRepository, useValue: MockRoomUserRepository() },
        { provide: ChatRepository, useValue: MockChatRepository() },
        { provide: UserRepository, useValue: MockUserRepository() },
      ],
    }).compile();

    signalService = module.get<SignalService>(SignalService);
    signalRepository = module.get(SignalRepository);
    trashRepository = module.get(CrashRepository);
    roomRepository = module.get(RoomRepository);
    roomUserRepository = module.get(RoomUserRepository);
    chatRepository = module.get(ChatRepository);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(signalService).toBeDefined();
    expect(signalRepository).toBeDefined();
    expect(trashRepository).toBeDefined();
    expect(roomRepository).toBeDefined();
    expect(roomUserRepository).toBeDefined();
    expect(chatRepository).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
