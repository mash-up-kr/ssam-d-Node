import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RoomRepository, UserRepository } from 'src/repositories';
import { MockRoomRepository, MockUserRepository } from 'test/mock/repositories';
import { DuplicatedNicknameException, UserNotFoundException } from 'src/exceptions';
import { RoomService } from '../room/room.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let roomRepository: ReturnType<typeof MockRoomRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: RoomService,
          useValue: { deleteRoom: jest.fn() },
        },
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: RoomRepository, useValue: MockRoomRepository() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(UserRepository);
    roomRepository = module.get(RoomRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('닉네임 중복 체크', () => {
    it('중복된 닉네임을 가진 유저가 없을 때', async () => {
      userRepository.get.mockResolvedValue(null);
      const userId = 1,
        nickname = '쌈디';

      const result = await service.isDuplicatedNickname(userId, nickname);
      expect(result).toBeUndefined();
    });

    it('중복된 닉네임을 가진 유저가 있지만 나 자신일 때', async () => {
      userRepository.get.mockResolvedValue({ id: 1, nickname: '쌈디' });
      const userId = 1,
        nickname = '쌈디';

      const result = await service.isDuplicatedNickname(userId, nickname);
      expect(result).toBeUndefined();
    });

    it('중복된 닉네임을 가진 다른 유저가 있을 때', async () => {
      userRepository.get.mockResolvedValue({ id: 2, nickname: '쌈디' });
      const userId = 1,
        nickname = '쌈디';

      try {
        await service.isDuplicatedNickname(userId, nickname);
      } catch (e) {
        expect(e).toBeInstanceOf(DuplicatedNicknameException);
      }
    });
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
      userRepository.get.mockResolvedValue({ id: 1 });
      roomRepository.getRoomIdsByUserId.mockResolvedValue([{ id: 1 }]);
      const userId = 1;

      const res = await service.deleteById(userId);
      expect(res).toEqual(undefined);
    });
  });
});
