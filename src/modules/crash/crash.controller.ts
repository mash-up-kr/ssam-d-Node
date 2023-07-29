import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CrashService } from './crash.service';
import { PageReqDto } from 'src/common/dto/page-req-dto';
import { PageResDto } from 'src/common/dto/page-res-dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { CrashReqDto } from './dto/crash-req.dto';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';

@UseGuards(AuthGuard)
@Controller('crashes')
export class CrashController {
  constructor(private readonly crashService: CrashService) {}

  @Get('/')
  async getCrashes(@AuthUser() userId: number, @Query() pagingDto: PageReqDto) {
    const { pageNo, pageLength } = pagingDto;
    const paging = new PageReqDto(pageNo, pageLength);

    const result = await this.crashService.getList(userId, paging);
    return new PageResDto(result.totalCount, pageLength, result.list);
  }

  @Post('/:id')
  async reply(@AuthUser() userId: number, @Body() replyReqDto: CrashReqDto) {
    await this.crashService.reply(userId, replyReqDto);
  }
}
