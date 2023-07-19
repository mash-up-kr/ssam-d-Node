import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { ChatRepository, RoomRepository, RoomUserRepository, UserRepository } from '../../repositories';
import { MockChatRepository, MockUserRepository } from '../../../test/mock/repositories';
import { MockRoomRepository } from '../../../test/mock/repositories/mock-room.repository';
import { MockRoomUserRepository } from '../../../test/mock/repositories/mock-room-user.repository';
import { RoomUser } from 'src/domains/room-user';
import { CannotSendChatException } from 'src/exceptions';
import { User } from '../../domains/user';

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

  describe('채팅방에서 채팅 보내기', () => {
    const senderId = 1;
    const receiverId = 2;
    const roomId = 1;
    const content = 'content';
    it('성공', async () => {
      roomUserRepository.get.mockResolvedValue(new RoomUser({ userId: senderId, roomId }));
      roomUserRepository.getMatchingUser.mockResolvedValue(new User({ id: receiverId }));

      const result = await roomService.sendChat(senderId, roomId, content);
      expect(result).toBeUndefined();
    });

    it('Room과 Sender가 일치하지 않을 때', async () => {
      roomUserRepository.get.mockResolvedValue(null);
      try {
        await roomService.sendChat(senderId, roomId, content);
      } catch (e) {
        expect(e).toBeInstanceOf(CannotSendChatException);
      }
    });
  });
});
