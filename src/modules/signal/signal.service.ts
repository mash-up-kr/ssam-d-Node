import { Injectable } from '@nestjs/common';
import { SignalRepository, TrashRepository } from 'src/repositories';
import { SignalReqDto } from './dto/signal-req-dto';
import { UserKeyword } from 'src/domains/user-keyword';
import { Signal } from 'src/domains/signal';
import { KeywordsService } from '../keywords/keywords.service';
@Injectable()
export class SignalService {
  constructor(
    private readonly signalRepository: SignalRepository,
    private readonly trashRepository: TrashRepository,
    private readonly keywordsService: KeywordsService
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
}
