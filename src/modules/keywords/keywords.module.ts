import { Module } from '@nestjs/common';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';

@Module({
  providers: [UserRepository, KeywordRepository, UserKeywordRepository, KeywordsService],
  controllers: [KeywordsController],
  exports: [KeywordsService],
})
export class KeywordsModule {}
