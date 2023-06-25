import { Injectable } from '@nestjs/common';
import { SignalRepository } from 'src/repositories';
import { SignalReqDto } from './dto/signal-req-dto';
import { UserKeyword } from 'src/domains/user-keyword';
import { Signal } from 'src/domains/signal';
import { match } from 'assert';
@Injectable()
export class SignalService {
  constructor(private readonly signalRepository: SignalRepository) {}

  async sendSignal(signalReqDto: SignalReqDto, matchingInfo: UserKeyword[]): Promise<void> {
    console.log(matchingInfo);
    const signalData = matchingInfo.map(matchingData => {
      console.log(matchingData);
      return {
        senderId: signalReqDto.senderId,
        receiverId: matchingData.userId,
        keywords: matchingData.keywords,
        content: signalReqDto.content,
      } as unknown as Exclude<Signal, 'id'>;
    });
    console.log(signalData);
    await this.signalRepository.save(signalData);
  }
}
