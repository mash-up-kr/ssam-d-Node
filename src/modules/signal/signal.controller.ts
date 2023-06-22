import { Controller, Post, Body } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalReqDto } from './dto/signal-req-dto';
@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}
  /**
   * 키워드로 일치하는 사람 고르기
   * 매칭
   * 없으면 트래쉬
   * 있으면 시그널
   */
  @Post('/send')
  async recommend(@Body() signalReqDto: SignalReqDto) {}
}
