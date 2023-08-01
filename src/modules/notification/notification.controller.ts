import { Controller, Post, Body } from '@nestjs/common';
import { ChatNotificationService } from './services/chat-notification.service';
import { SignalNotificationService } from './services/signal-notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly chatNotificationService: ChatNotificationService,
    private readonly signalNotificationService: SignalNotificationService
  ) {}

  /**
   *  테스트 컨트롤러
   */
  @Post('/single')
  async testNoti(@Body('deviceTokenId') deviceTokenId: string, @Body('roomId') roomId: number) {
    try {
      const result = await this.chatNotificationService.sendNotification(
        deviceTokenId,
        roomId,
        300000,
        '재성오빠 보여????',
        '혜온이당'
      );
      console.log('Successfully sent push notification:', result);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
  @Post('/multi')
  async testNoti2(
    @Body('deviceTokenIds') deviceTokenIds: string[],
    @Body('matchingKeywords') matchingKeywords: string[]
  ) {
    try {
      const result = await this.signalNotificationService.sendNotification(deviceTokenIds, matchingKeywords, 30000);
      console.log('Successfully sent push notifications:', result);
    } catch (error) {
      console.error('Error sending push notifications:', error);
    }
  }
}
