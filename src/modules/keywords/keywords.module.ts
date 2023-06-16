import { Module } from '@nestjs/common';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { KeywordRepository } from 'src/repositories';

@Module({
  providers: [KeywordsService, KeywordRepository],
  exports: [KeywordsService],
  controllers: [KeywordsController],
})
export class KeywordsModule {}
