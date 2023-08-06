import { Module } from '@nestjs/common';
import { SignalNotificationService } from './services/signal-notification.service';
import { NotificationController } from './notification.controller';
import { NotificationBaseService } from './services/notification.base.service';
import { ChatNotificationService } from './services/chat-notification.service';
import { DeviceTokenRepository, RoomUserRepository, UserRepository } from 'src/repositories';

@Module({
  controllers: [NotificationController],
  providers: [
    ChatNotificationService,
    SignalNotificationService,
    NotificationBaseService,
    DeviceTokenRepository,
    RoomUserRepository,
    UserRepository,
  ],
  exports: [ChatNotificationService, SignalNotificationService],
})
export class NotificationModule {}
