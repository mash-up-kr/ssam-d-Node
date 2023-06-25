import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { KeywordsService } from '../keywords/keywords.service';
import { SignalController } from './signal.controller';
import { SignalRepository, UserKeywordRepository, UserRepository, KeywordRepository } from 'src/repositories';

@Module({
  controllers: [SignalController],
  exports: [SignalService],
  providers: [
    SignalService,
    SignalRepository,
    KeywordsService,
    UserKeywordRepository,
    UserRepository,
    KeywordRepository,
  ],
})
export class SignalModule {}
