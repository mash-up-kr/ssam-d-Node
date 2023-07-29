import { Controller, Get, Post, Query } from '@nestjs/common';
import { CrashService } from './crash.service';
import { PageReqDto } from 'src/common/dto/page-req-dto';
import { PageResDto } from 'src/common/dto/page-res-dto';

@Controller('crashes')
export class CrashController {
  constructor(private readonly crashService: CrashService) {}

  @Get('/')
  async getCrashes(@Query() pagingDto: PageReqDto) {
    const { pageNo, pageLength } = pagingDto;
    const paging = new PageReqDto(pageNo, pageLength);

    const result = await this.crashService.getList(paging);
    return new PageResDto(result.totalCount, pageLength, result.list);
  }
}
