import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { ChatRepository, RoomRepository, RoomUserRepository, UserRepository } from '../../repositories';
import { MockChatRepository, MockUserRepository } from '../../../test/mock/repositories';
import { MockRoomRepository } from '../../../test/mock/repositories/mock-room.repository';
import { MockRoomUserRepository } from '../../../test/mock/repositories/mock-room-user.repository';

describe('RoomService', () => {
  let roomService: RoomService;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let roomUserRepository: ReturnType<typeof MockRoomUserRepository>;
  let roomRepository: ReturnType<typeof MockRoomRepository>;
  let chatRepository: ReturnType<typeof MockChatRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: RoomRepository, useValue: MockRoomRepository() },
        { provide: RoomUserRepository, useValue: MockRoomUserRepository() },
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: ChatRepository, useValue: MockChatRepository() },
      ],
    }).compile();

    roomRepository = module.get(RoomRepository);
    roomService = module.get<RoomService>(RoomService);
    roomUserRepository = module.get(RoomUserRepository);
    userRepository = module.get(UserRepository);
    chatRepository = module.get(ChatRepository);
  });

  it('should be defined', () => {
    expect(roomService).toBeDefined();
    expect(roomRepository).toBeDefined();
    expect(roomUserRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(chatRepository).toBeDefined();
  });
});
