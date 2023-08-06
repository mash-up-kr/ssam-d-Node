import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import {
  ChatRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  CrashRepository,
  UserKeywordRepository,
  UserRepository,
} from 'src/repositories';
import { KeywordsModule } from '../keywords/keywords.module';
import { SignalNotificationService } from '../notification/services/signal-notification.service';
import { NotificationBaseService } from '../notification/services/notification.base.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [SignalController],
  imports: [KeywordsModule, NotificationModule],
  providers: [
    SignalService,
    SignalRepository,
    CrashRepository,
    RoomRepository,
    RoomUserRepository,
    UserKeywordRepository,
    ChatRepository,
    UserRepository,
  ],
  exports: [SignalService],
})
export class SignalModule {}
