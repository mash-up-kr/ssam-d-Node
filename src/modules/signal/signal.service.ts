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
  MatchingUserNotFoundException,
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
import { DELETED_USER_NICKNAME } from 'src/common/constants';
import { SentSignalResDto } from './dto/sent-signal-res-dto';
import { SentSignalDetailResDto } from './dto/sent-signal-detail-res-dto';
import { SignalNotificationService } from '../notification/services/signal-notification.service';
import { ChatNotificationService } from '../notification/services/chat-notification.service';

@Injectable()
export class SignalService {
  constructor(
    private readonly signalRepository: SignalRepository,
    private readonly trashRepository: CrashRepository,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly chatRepository: ChatRepository,
    private readonly userKeywordRepository: UserKeywordRepository,
    private readonly userRepository: UserRepository,
    private readonly signalNotificationService: SignalNotificationService,
    private readonly chatNotificationService: ChatNotificationService
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
      const signalData = matchingInfo.map(matchingData => {
        return {
          senderId: senderId,
          receiverId: matchingData.userId,
          keywords: matchingData.keywords,
          content: content,
        } as unknown as Exclude<Signal, 'id'>;
      });
      await this.signalNotificationService.sendSignalNotification(signalData);

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
      id: signal.id,
      keywords: signal.keywordList,
      matchingKeywordCount: signal.keywordList.length,
      content: signal.content,
      profileImage: sender.profileImageUrl,
      nickname: sender?.nickname ?? DELETED_USER_NICKNAME,
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

    const firstSender = await this.userRepository.get({ id: firstSignal.senderId });
    if (!firstSender) {
      throw new MatchingUserNotFoundException();
    }

    if (senderId !== firstSignal.receiverId) {
      throw new SignalSenderMismatchException();
    }

    try {
      const roomId = await this.createRoomAndChat(firstSignal, senderId, content);
      await this.chatNotificationService.sendChatNotification(senderId, roomId, content);
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
  ): Promise<number> {
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
    return room.id;
  }

  async getSignalListById(receiverId: number, pageReqDto: PageReqDto): Promise<PageResDto<SignalResDto>> {
    const { pageLength } = pageReqDto;
    const totalSignalNumber = await this.signalRepository.countSignalsById(receiverId);
    const signals: Signal[] = await this.signalRepository.getList(receiverId, pageReqDto.limit, pageReqDto.offset);
    const senderIds = signals.map(signal => signal.senderId);
    const userList = await this.userRepository.getUserList(senderIds);

    const signalList = signals
      .filter(signal => userList.map(user => user.id).includes(signal.senderId))
      .map(signal => {
        const sender = userList.find(user => user.id === signal.senderId);
        return new SignalResDto({
          signalId: signal.id,
          receiverId: signal.receiverId,
          senderId: signal.senderId,
          senderName: sender?.nickname ?? DELETED_USER_NICKNAME,
          senderProfileImageUrl: sender?.profileImageUrl,
          content: signal.content,
          keywords: signal.keywords.split(','),
          keywordsCount: signal.keywords.split(',').length,
          receivedTimeMillis: new Date(signal.createdAt).getTime(),
        });
      });
    return new PageResDto(totalSignalNumber, pageLength, signalList);
  }

  async getSentSignals(userId: number, pageReqDto: PageReqDto): Promise<PageResDto<SentSignalResDto>> {
    const { pageLength } = pageReqDto;
    const sentSignals = await this.signalRepository.getSentSignalsByUserId(userId, pageReqDto.limit, pageReqDto.offset);
    const sentSignalResDtoList = sentSignals.map(
      sentSignal =>
        new SentSignalResDto({
          id: sentSignal.id,
          content: sentSignal.content,
          sentTimeMillis: sentSignal.createdAt,
        })
    );
    return new PageResDto(sentSignals.length, pageLength, sentSignalResDtoList);
  }

  async getSentSignalDetail(userId: number, signalId: number): Promise<SentSignalDetailResDto> {
    const signal = await this.signalRepository.get({ id: signalId });
    if (!signal) throw new SignalNotFoundException();
    const user = await this.userRepository.get({ id: signal.senderId });
    if (!user) throw new UserNotFoundException();

    return new SentSignalDetailResDto({
      id: signal.id,
      keywords: signal.keywordList,
      matchingKeywordCount: signal.keywordList.length,
      content: signal.content,
      profileImage: user.profileImageUrl,
      sentTimeMillis: new Date(signal.createdAt).getTime(),
    });
  }
}
