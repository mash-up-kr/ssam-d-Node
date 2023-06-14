import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordRepository } from 'src/repositories';

@Module({
  providers: [KeywordsService, KeywordRepository],
  exports: [KeywordsService],
})
export class KeywordsModule {}
