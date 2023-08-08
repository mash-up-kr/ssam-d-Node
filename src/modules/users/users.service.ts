import { Injectable } from '@nestjs/common';
import { UserNicknameReqDto, UserReqDto } from './dto/user-req-dto';
import { RoomRepository, UserRepository } from 'src/repositories';
import { DuplicatedNicknameException, UserNotFoundException } from 'src/exceptions';
import { User } from 'src/domains/user';
import { RoomService } from '../room/room.service';
import { Transactional } from 'src/common/lazy-decorators/transactional.decorator';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roomService: RoomService,
    private readonly roomRepository: RoomRepository
  ) {}

  async findOne(userReqDto: UserReqDto): Promise<User> {
    const { email } = userReqDto;
    const user = await this.userRepository.get({ email });
    return user;
  }

  @Transactional()
  async deleteById(userId: number, transaction: PrismaTransaction = null): Promise<void> {
    const user = await this.userRepository.get({ id: userId }, transaction);
    if (!user) throw new UserNotFoundException();

    await this.userRepository.delete(userId);
    const roomIds = await this.roomRepository.getRoomIdsByUserId(userId, transaction);
    for (const roomId of roomIds) {
      await this.roomService.deleteRoom(userId, roomId, transaction);
    }
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async isDuplicatedNickname(userId: number, nickname: string): Promise<void> {
    const user = await this.userRepository.get({ nickname });
    if (user && user.id !== userId) {
      throw new DuplicatedNicknameException({ nickname });
    }
  }

  async updateNickname(userId: number, userNicknameDto: UserNicknameReqDto): Promise<void> {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    const { nickname } = userNicknameDto;
    await this.isDuplicatedNickname(userId, nickname);
    await this.userRepository.update(userId, { nickname });
  }

  async updateAgreeAlarm(userId: number, agreeAlarm: boolean): Promise<void> {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    await this.userRepository.update(userId, { agreeAlarm });
  }
}
