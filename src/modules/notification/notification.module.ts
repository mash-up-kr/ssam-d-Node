import { Module } from '@nestjs/common';
import { SignalNotificationService } from './services/signal-notification.service';
import { NotificationController } from './notification.controller';
import { NotificationBaseService } from './services/notification.base.service';
import { ChatNotificationService } from './services/chat-notification.service';

@Module({
  controllers: [NotificationController],
  providers: [ChatNotificationService, SignalNotificationService, NotificationBaseService],
  exports: [ChatNotificationService, SignalNotificationService],
})
export class NotificationModule {}
