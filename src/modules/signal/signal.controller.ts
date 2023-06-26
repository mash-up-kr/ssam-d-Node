import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalReqDto } from './dto/signal-req-dto';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';

@Controller('signal')
@UseGuards(AuthGuard)
export class SignalController {
  constructor(private readonly signalService: SignalService, private readonly keywordService: KeywordsService) {}

  @Post('/send')
  async sendSignal(@AuthUser() senderId, @Body() signalReqDto: SignalReqDto) {
    await this.signalService.sendSignal(senderId, signalReqDto);
  }

  @Post('/:id/reply')
  async replyFirstSignal(
    @AuthUser() senderId,
    @Param('id') signalId: string,
    @Body() signalReqDto: Pick<SignalReqDto, 'content'>
  ) {
    await this.signalService.replyFirstSignal(+signalId, senderId, signalReqDto);
  }
}
