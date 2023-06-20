import { Module } from '@nestjs/common';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';

@Module({
  providers: [KeywordsService, KeywordRepository, UserRepository, UserKeywordRepository],
  exports: [KeywordsService],
  controllers: [KeywordsController],
})
export class KeywordsModule {}
