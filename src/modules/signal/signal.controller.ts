import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalReqDto } from './dto/signal-req-dto';
import { SignalResDto } from './dto/signal-res-dto';

import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService, private readonly keywordService: KeywordsService) {}

  @UseGuards(AuthGuard)
  @Post('/send')
  async sendSignal(@AuthUser() senderId, @Body() signalReqDto: SignalReqDto) {
    await this.signalService.sendSignal(senderId, signalReqDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getSignal(@AuthUser() receiverId) {
    const signalList = await this.signalService.getSignalListById(receiverId);
    return signalList.map(signal => new SignalResDto(signal));
  }
}
