import { Controller, Post, Body } from '@nestjs/common';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalReqDto } from './dto/signal-req-dto';
@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService, private readonly keywordService: KeywordsService) {}
  /**
   * 키워드로 일치하는 사람 고르기
   * 매칭
   * 없으면 트래쉬
   * 있으면 시그널
   */
  @Post('/send')
  async sendSignal(@Body() signalReqDto: SignalReqDto) {
    /**키워드 */
    await this.keywordService.matchingUserByKeywords(signalReqDto);
  }
}
