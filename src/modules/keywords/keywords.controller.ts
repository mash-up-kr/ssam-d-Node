import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { KeywordReqDto } from './dto/keyword-req.dto';

@UseGuards(AuthGuard)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Get('/recommend')
  async recommend(@Query('content') content: string) {
    const keywords = await this.keywordsService.recommend(content);
    return { keywords };
  }

  @Post('/')
  async addUserKeywords(@AuthUser() userId: number, @Body() keywordsDto: KeywordReqDto) {
    await this.keywordsService.addUserKeywords(userId, keywordsDto.keywords);
  }
}
