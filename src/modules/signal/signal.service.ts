import {Injectable} from '@nestjs/common';
import {ChatRepository, RoomRepository, RoomUserRepository, SignalRepository, TrashRepository,} from 'src/repositories';
import {SignalReqDto} from './dto/signal-req-dto';
import {Signal} from 'src/domains/signal';
import {KeywordsService} from '../keywords/keywords.service';
import {SignalNotFoundException, SingalReplyException} from 'src/exceptions';
import {PrismaService} from 'src/prisma/prisma.service';

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

  async replyFirstSignal(id: number, senderId: number, signalReqDto: Pick<SignalReqDto, 'content'>): Promise<void> {
    const { content } = signalReqDto;
    const firstSignal = await this.signalRepository.get({ id });

    if (!firstSignal) throw new SignalNotFoundException();

    this.prisma
      .$transaction(async transaction => {
        const room = await this.roomRepository.save({ keywords: firstSignal.keywords }, transaction);
        await this.signalRepository.update(firstSignal.id, { roomId: room.id }, transaction);

        if (senderId !== firstSignal.receiverId) {
          throw new SingalReplyException();
        }

        await this.roomUserRepository.saveAll(
          [
            {
              roomId: room.id,
              userId: firstSignal.senderId,
            },
            {
              roomId: room.id,
              userId: senderId,
            },
          ],
          transaction
        );
        await this.chatRepository.saveAll(
          [
            {
              roomId: room.id,
              content: firstSignal.content,
              senderId: firstSignal.senderId,
              createdAt: firstSignal.createdAt,
            },
            {
              roomId: room.id,
              content: content,
              senderId: senderId,
            },
          ],
          transaction
        );
      })
      .catch(e => {
        throw new SingalReplyException();
      });
  }

  async getSignalListById(receiverId: number) {
    return await this.signalRepository.getList(receiverId);
  }
}
