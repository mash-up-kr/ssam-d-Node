import { Module } from '@nestjs/common';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { SignalService } from '../signal/signal.service';
import {
  KeywordRepository,
  UserKeywordRepository,
  UserRepository,
  TrashRepository,
  SignalRepository,
} from 'src/repositories';

@Module({
  providers: [
    KeywordsService,
    KeywordRepository,
    UserRepository,
    UserKeywordRepository,
    TrashRepository,
    SignalService,
    SignalRepository,
  ],
  exports: [KeywordsService],
  controllers: [KeywordsController],
})
export class KeywordsModule {}
