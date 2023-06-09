import { Injectable } from '@nestjs/common';
import {
  ChatRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  TrashRepository,
  UserKeywordRepository,
} from 'src/repositories';
import { SignalReqDto } from './dto/signal-req-dto';
import { Signal } from 'src/domains/signal';
import { SignalNotFoundException, SignalSenderMismatchException } from 'src/exceptions';
import { Transactional } from '../../common/lazy-decorators/transactional.decorator';
import { PrismaTransaction } from 'src/types/prisma.type';
import { UserKeyword } from 'src/domains/user-keyword';

@Injectable()
export class SignalService {
  constructor(
    private readonly signalRepository: SignalRepository,
    private readonly trashRepository: TrashRepository,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly chatRepository: ChatRepository,
    private readonly userKeywordRepository: UserKeywordRepository
  ) {}

  async sendSignal(senderId: number, signalReqDto: SignalReqDto): Promise<void> {
    const { keywords, content } = signalReqDto;

    const matchingInfo = await this.getMatchingUserByKeywords(senderId, keywords);
    if (matchingInfo.length === 0) {
      const trashData = { userId: senderId, keywords: keywords.join(','), content: content };
      await this.trashRepository.save(trashData);
    } else {
      /**
       * TODO:  deviceToken으로 알림하고 시그널 전송하기, + 키워드 개수
       * */

      const signalData = matchingInfo.map(matchingData => {
        return {
          senderId: senderId,
          receiverId: matchingData.userId,
          keywords: matchingData.keywords,
          content: content,
        } as unknown as Exclude<Signal, 'id'>;
      });

      await this.signalRepository.save(signalData);
    }
  }

  async getMatchingUserByKeywords(senderId: number, keywords: string[]): Promise<UserKeyword[]> {
    const matchingInfo = await this.userKeywordRepository.getMatchingInfoForSignal(senderId, keywords);
    return matchingInfo;
  }

  async replyFirstSignal(
    signalId: number,
    senderId: number,
    signalReqDto: Pick<SignalReqDto, 'content'>
  ): Promise<void> {
    const { content } = signalReqDto;
    const firstSignal = await this.signalRepository.get({ id: signalId });
    if (!firstSignal) throw new SignalNotFoundException();

    if (senderId !== firstSignal.receiverId) {
      throw new SignalSenderMismatchException();
    }
    await this.createRoomAndChat(firstSignal, senderId, content);
  }

  @Transactional()
  async createRoomAndChat(
    firstSignal: Signal,
    senderId: number,
    content: string,
    transaction: PrismaTransaction = null
  ): Promise<void> {
    const room = await this.roomRepository.save({ keywords: firstSignal.keywords }, transaction);
    await this.signalRepository.update(firstSignal.id, { roomId: room.id }, transaction);
    await this.signalRepository.deleteById(firstSignal.id);
    const firstSender = {
      roomId: room.id,
      userId: firstSignal.senderId,
    };
    const replySender = {
      userId: senderId,
      roomId: room.id,
    };
    await this.roomUserRepository.saveAll([firstSender, replySender], transaction);

    const firstChat = {
      roomId: room.id,
      content: firstSignal.content,
      senderId: firstSignal.senderId,
      createdAt: firstSignal.createdAt,
    };
    const replyChat = {
      roomId: room.id,
      content: content,
      senderId: senderId,
    };
    await this.chatRepository.saveAll([firstChat, replyChat], transaction);
  }

  async getSignalListById(receiverId: number) {
    return await this.signalRepository.getList(receiverId);
  }
}
