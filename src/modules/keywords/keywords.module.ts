import { Module } from '@nestjs/common';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { SignalService } from '../signal/signal.service';
import {
  KeywordRepository,
  SignalRepository,
  UserKeywordRepository,
  UserRepository,
  TrashRepository,
  RoomRepository,
  RoomUserRepository,
  ChatRepository,
} from 'src/repositories';

@Module({
  providers: [
    UserRepository,
    KeywordRepository,
    UserKeywordRepository,
    KeywordsService,
  ],
  controllers: [KeywordsController],
  exports: [
      KeywordsService
  ]
})
export class KeywordsModule {}
