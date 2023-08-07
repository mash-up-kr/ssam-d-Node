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
  DeviceTokenRepository,
} from 'src/repositories';
import {
  MockCrashRepository,
  MockSignalRepository,
  MockUserKeywordRepository,
  MockUserRepository,
  MockDeviceTokenRepository,
} from 'test/mock/repositories';
import { ConfigModule } from '@nestjs/config';
import { MockRoomRepository } from '../../../test/mock/repositories/mock-room.repository';
import { MockRoomUserRepository } from '../../../test/mock/repositories/mock-room-user.repository';
import { MockChatRepository } from '../../../test/mock/repositories/mock-chat.repository';
import { SignalNotificationService } from '../notification/services/signal-notification.service';
import { NotificationBaseService } from '../notification/services/notification.base.service';
import { ChatNotificationService } from '../notification/services/chat-notification.service';

describe('SignalService', () => {
  let signalService: SignalService;
  let signalRepository: ReturnType<typeof MockSignalRepository>;
  let trashRepository: ReturnType<typeof MockCrashRepository>;
  let roomRepository: ReturnType<typeof MockRoomRepository>;
  let roomUserRepository: ReturnType<typeof MockRoomUserRepository>;
  let chatRepository: ReturnType<typeof MockChatRepository>;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let signalNotificationService: SignalNotificationService;
  let chatNotificationService: ChatNotificationService;
  let notificationBaseService: NotificationBaseService;
  let deviceTokenRepository: ReturnType<typeof MockDeviceTokenRepository>;

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
        SignalNotificationService,
        ChatNotificationService,
        NotificationBaseService,
        { provide: DeviceTokenRepository, useValue: MockDeviceTokenRepository() },
      ],
    }).compile();

    signalService = module.get<SignalService>(SignalService);
    signalRepository = module.get(SignalRepository);
    trashRepository = module.get(CrashRepository);
    roomRepository = module.get(RoomRepository);
    roomUserRepository = module.get(RoomUserRepository);
    chatRepository = module.get(ChatRepository);
    userRepository = module.get(UserRepository);
    signalNotificationService = module.get<SignalNotificationService>(SignalNotificationService);
    chatNotificationService = module.get<ChatNotificationService>(ChatNotificationService);
    notificationBaseService = module.get<NotificationBaseService>(NotificationBaseService);
    deviceTokenRepository = module.get(DeviceTokenRepository);
  });

  xit('should be defined', () => {
    expect(signalService).toBeDefined();
    expect(signalRepository).toBeDefined();
    expect(trashRepository).toBeDefined();
    expect(roomRepository).toBeDefined();
    expect(roomUserRepository).toBeDefined();
    expect(chatRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(signalNotificationService).toBeDefined();
    expect(chatNotificationService).toBeDefined();
    expect(notificationBaseService).toBeDefined();
    expect(deviceTokenRepository).toBeDefined();
  });
});
