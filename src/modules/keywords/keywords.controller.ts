import { Controller, Get, Query } from '@nestjs/common';
import { KeywordsService } from './keywords.service';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Get()
  async recommend(@Query('content') content: string) {
    const keywords = await this.keywordsService.recommend(content);
    return { keywords };
  }
}
