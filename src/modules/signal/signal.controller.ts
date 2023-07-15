import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalReqDto } from './dto/signal-req-dto';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { PageReqDto } from 'src/common/dto/page-req-dto';

@UseGuards(AuthGuard)
@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post('/send')
  async sendSignal(@AuthUser() senderId, @Body() signalReqDto: SignalReqDto) {
    await this.signalService.sendSignal(senderId, signalReqDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getSignalListDate(@AuthUser() receiverId, @Query() pageReqDto: PageReqDto) {
    const page = new PageReqDto(pageReqDto.pageNo, pageReqDto.pageLength);
    return await this.signalService.getSignalListById(receiverId, page);
  }

  @Post('/:id/reply')
  async replyFirstSignal(
    @AuthUser() senderId,
    @Param('id', ParseIntPipe) signalId: number,
    @Body() signalReqDto: Pick<SignalReqDto, 'content'>
  ) {
    await this.signalService.replyFirstSignal(signalId, senderId, signalReqDto);
  }
}
