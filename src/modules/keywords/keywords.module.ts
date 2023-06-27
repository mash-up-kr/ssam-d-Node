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
    KeywordsService,
    KeywordRepository,
    UserRepository,
    UserKeywordRepository,
    SignalService,
    SignalRepository,
    TrashRepository,
    RoomRepository,
    RoomUserRepository,
    ChatRepository,
  ],
  controllers: [KeywordsController],
})
export class KeywordsModule {}
