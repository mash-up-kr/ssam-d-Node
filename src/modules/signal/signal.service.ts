import { Injectable } from '@nestjs/common';
import {
  ChatRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  TrashRepository,
} from 'src/repositories';
import { SignalReqDto } from './dto/signal-req-dto';
import { Signal } from 'src/domains/signal';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalNotFoundException } from 'src/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomUser } from 'src/domains/room-user';

@Injectable()
export class SignalService {
  constructor(
    private readonly signalRepository: SignalRepository,
    private readonly trashRepository: TrashRepository,
    private readonly keywordsService: KeywordsService,
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly chatRepository: ChatRepository,
    private readonly prisma: PrismaService
  ) {}

  async sendSignal(senderId: number, signalReqDto: SignalReqDto): Promise<void> {
    const { keywords, content } = signalReqDto;

    const matchingInfo = await this.keywordsService.matchingUserByKeywords(senderId, keywords);
    if (!matchingInfo.length) {
      const trashData = { userId: senderId, keywords: keywords.join(','), content: content };
      await this.trashRepository.save(trashData);
    } else {
      /**
       * TODO:  deviceToken으로 알림하고 시그널 전송하기
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

  async replyFirstSignal(id: number, senderId: number, signalReqDto: Pick<SignalReqDto, 'content'>): Promise<void> {
    const { content } = signalReqDto;
    console.log(id);
    const firstSignal = await this.signalRepository.get({ id });
    console.log(firstSignal.receiverId);

    if (!firstSignal) throw new SignalNotFoundException();

    this.prisma
      .$transaction(async transaction => {
        const room = await this.roomRepository.save({ keywords: firstSignal.keywords }, transaction);
        const test = await this.roomRepository.getList([room.id]);
        await this.signalRepository.update(firstSignal.id, { roomId: room.id }, transaction);

        const currentReceiverId = firstSignal.senderId;
        console.log(firstSignal);
        await this.roomUserRepository.saveAll(
          [
            {
              roomId: room.id,
              userId: currentReceiverId,
            },
            {
              roomId: room.id,
              userId: senderId,
            },
          ],
          transaction
        );
        await this.chatRepository.save(
          {
            roomId: room.id,
            content: firstSignal.content,
            senderId: firstSignal.senderId,
            createdAt: firstSignal.createdAt,
          },
          transaction
        );
        await this.chatRepository.save(
          {
            roomId: room.id,
            content: firstSignal.content,
            senderId: firstSignal.senderId,
            createdAt: firstSignal.createdAt,
          },
          transaction
        );
      })
      .catch(e => {
        console.log('rrrrrr');
        console.log(e);
      });
  }
}
