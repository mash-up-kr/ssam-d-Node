import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { CrashService } from './crash.service';
import { PageReqDto } from 'src/common/dto/page-req-dto';
import { PageResDto } from 'src/common/dto/page-res-dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { CrashReqDto } from './dto/crash-req.dto';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { CrashResDto } from './dto/crash-res.dto';

@UseGuards(AuthGuard)
@Controller('crashes')
export class CrashController {
  constructor(private readonly crashService: CrashService) {}

  @Get('/')
  async getCrashes(@AuthUser() userId: number, @Query() pagingDto: PageReqDto) {
    const { pageNo, pageLength } = pagingDto;
    const paging = new PageReqDto(pageNo, pageLength);

    const result = await this.crashService.getList(userId, paging);

    const crashes = result.list.map(crash => CrashResDto.fromDomain(crash));
    return new PageResDto(result.totalCount, pageLength, crashes);
  }

  @Get('/:crashId')
  async getCrash(@AuthUser() userId: number, @Param('crashId', ParseIntPipe) crashId: number) {
    const crash = await this.crashService.get(userId, crashId);

    return CrashResDto.fromDomain(crash);
  }

  @Post('/:id/reply')
  async reply(
    @AuthUser() userId: number,
    @Param('id', ParseIntPipe) crashId: number,
    @Body() replyReqDto: CrashReqDto
  ) {
    await this.crashService.replyAndNotification(userId, crashId, replyReqDto);
  }
}
