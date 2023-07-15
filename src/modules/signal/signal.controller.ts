import { Body, Controller, Get, Param, Post, UseGuards, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalReqDto } from './dto/signal-req-dto';
import { SignalResDto } from './dto/signal-res-dto';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { PageReqDto } from 'src/common/dto/page-req-dto';

@UseGuards(AuthGuard)
@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService, private readonly keywordService: KeywordsService) {}

  @Post('/send')
  async sendSignal(@AuthUser() senderId, @Body() signalReqDto: SignalReqDto) {
    await this.signalService.sendSignal(senderId, signalReqDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getSignalListDate(@AuthUser() receiverId, @Query() pageReqDto: PageReqDto) {
    const { pageNo, pageLength } = pageReqDto;
    const page = new PageReqDto(pageNo, pageLength);
    return await this.signalService.getSignalListById(receiverId, page);
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
