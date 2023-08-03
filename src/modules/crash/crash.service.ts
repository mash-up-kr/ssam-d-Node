import { Injectable } from '@nestjs/common';
import { PageReqDto } from 'src/common/dto/page-req-dto';
import { Transactional } from 'src/common/lazy-decorators/transactional.decorator';
import { ChatRepository, CrashRepository, RoomRepository, RoomUserRepository } from 'src/repositories';
import { PrismaTransaction } from 'src/types/prisma.type';
import { CrashReqDto } from './dto/crash-req.dto';
import { CannotAccessMyCrashException, CrashNotFoundException, InvalidCrashException } from 'src/exceptions';
import { RoomUser } from 'src/domains/room-user';
import { Chat } from 'src/domains/chat';
import { CrashResDto } from './dto/crash-res.dto';

@Injectable()
export class CrashService {
  constructor(
    private readonly crashRepository: CrashRepository,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly chatRepository: ChatRepository
  ) {}

  @Transactional()
  async getList(userId: number, paging: PageReqDto, transaction: PrismaTransaction = null) {
    const { offset, limit } = paging;
    const crashes = await this.crashRepository.getList(userId, offset, limit, transaction);
    const totalCount = await this.crashRepository.getCount(transaction);

    return { totalCount, list: crashes };
  }

  /**
   * @description
   * 누군가 답장하기 전에 이미 목록 조회를 한 경우 상세까지 와서 답장 가능
   */
  async get(userId: number, crashId: number) {
    const crash = await this.crashRepository.get(crashId);
    if (!crash) {
      throw new CrashNotFoundException();
    }

    if (crash.userId === userId) {
      throw new CannotAccessMyCrashException();
    }

    return crash;
  }

  @Transactional()
  async reply(
    userId: number,
    crashId: number,
    replyReqDto: CrashReqDto,
    transaction: PrismaTransaction = null
  ): Promise<void> {
    const { content } = replyReqDto;

    const crash = await this.crashRepository.get(crashId, transaction);
    if (!crash) {
      throw new CrashNotFoundException();
    }

    if (userId === crash.userId) {
      throw new InvalidCrashException();
    }

    await this.crashRepository.delete(crashId);

    const room = await this.roomRepository.save({ keywords: crash.keywords }, transaction);

    const firstSender = new RoomUser({ roomId: room.id, userId: crash.userId });
    const replySender = new RoomUser({ roomId: room.id, userId });
    await this.roomUserRepository.saveAll([firstSender, replySender], transaction);

    const firstChat = new Chat({ roomId: room.id, content, senderId: crash.userId, createdAt: crash.createdAt });
    const replyChat = new Chat({ roomId: room.id, content, senderId: userId });
    await this.chatRepository.saveAll([firstChat, replyChat], transaction);
  }
}
