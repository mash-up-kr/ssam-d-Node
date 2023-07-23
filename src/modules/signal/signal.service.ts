import { Injectable } from '@nestjs/common';
import {
  ChatRepository,
  CrashRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  UserKeywordRepository,
  UserRepository,
} from 'src/repositories';
import { SignalReqDto } from './dto/signal-req-dto';
import { Signal } from 'src/domains/signal';
import {
  SignalNotFoundException,
  SignalReplyException,
  SignalSenderMismatchException,
  SignalSendException,
  UserNotFoundException,
} from 'src/exceptions';
import { Transactional } from '../../common/lazy-decorators/transactional.decorator';
import { PrismaTransaction } from 'src/types/prisma.type';
import { UserKeyword } from 'src/domains/user-keyword';
import { SignalResDto } from './dto/signal-res-dto';
import { PageReqDto } from 'src/common/dto/page-req-dto';
import { PageResDto } from 'src/common/dto/page-res-dto';
import { SignalDetailResDto } from './dto/signal-detail-res-dto';

@Injectable()
export class SignalService {
  constructor(
    private readonly signalRepository: SignalRepository,
    private readonly trashRepository: CrashRepository,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly chatRepository: ChatRepository,
    private readonly userKeywordRepository: UserKeywordRepository,
    private readonly userRepository: UserRepository
  ) {}

  async sendSignal(senderId: number, signalReqDto: SignalReqDto): Promise<void> {
    const { keywords, content } = signalReqDto;

    const matchingInfo = await this.getMatchingUserByKeywords(senderId, keywords);
    if (matchingInfo.length === 0) {
      const trashData = { userId: senderId, keywords: keywords.join(','), content: content };
      try {
        await this.trashRepository.save(trashData);
      } catch (e) {
        throw new SignalSendException();
      }
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
      try {
        await this.signalRepository.save(signalData);
      } catch (e) {
        throw new SignalSendException();
      }
    }
  }

  async getMatchingUserByKeywords(senderId: number, keywords: string[]): Promise<UserKeyword[]> {
    const matchingInfo = await this.userKeywordRepository.getMatchingInfoForSignal(senderId, keywords);
    return matchingInfo;
  }

  async getSignalDetail(userId: number, signalId: number) {
    const signal = await this.signalRepository.get({ id: signalId });
    if (!signal) throw new SignalNotFoundException();
    const sender = await this.userRepository.get({ id: signal.senderId });
    if (!sender) throw new UserNotFoundException();

    return new SignalDetailResDto({
      signalId: signal.id,
      keywords: signal.keywordList,
      matchingKeywordCount: signal.keywordList.length,
      content: signal.content,
      profileImage: sender.profileImageUrl,
      nickname: sender.nickname,
      receivedTimeMillis: new Date(signal.createdAt).getTime(),
    });
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

    try {
      await this.createRoomAndChat(firstSignal, senderId, content);
    } catch (e) {
      throw new SignalReplyException();
    }
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
    await this.signalRepository.deleteById(firstSignal.id, transaction);
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

  async getSignalListById(receiverId: number, pageReqDto: PageReqDto): Promise<PageResDto<SignalResDto>> {
    const { pageLength } = pageReqDto;
    const totalSignalNumber = await this.signalRepository.countSignalsById(receiverId);
    const signals: Signal[] = await this.signalRepository.getList(receiverId, pageReqDto.limit(), pageReqDto.offset());
    const senderIds = signals.map(signal => signal.senderId);
    const userData = await this.userRepository.getUserList(senderIds);

    const signalList = signals.map(
      signal =>
        new SignalResDto({
          signalId: signal.id,
          receiverId: signal.receiverId,
          senderId: signal.senderId,
          senderName: userData.find(user => user.id === signal.senderId).nickname,
          senderProfileImageUrl: userData.find(user => user.id === signal.senderId).profileImageUrl,
          content: signal.content,
          keywords: signal.keywords.split(','),
          keywordsCount: signal.keywords.split(',').length,
          receivedTimeMillis: new Date(signal.createdAt).getTime(),
        })
    );
    return new PageResDto(totalSignalNumber, pageLength, signalList);
  }
}
