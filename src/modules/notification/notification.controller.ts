import { Controller, Post } from '@nestjs/common';
import { ChatNotificationService } from './services/chat-notification.service';
import { SignalNotificationService } from './services/signal-notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly chatNotificationService: ChatNotificationService,
    private readonly signalNotificationService: SignalNotificationService
  ) {}

  // @Post('/single')
  // async testNoti() {
  //   const deviceId = 'DEVICE_REGISTRATION_TOKEN'; // Replace with the actual FCM registration token of the target device

  //   const payload = {
  //     data: {
  //       key1: 'value1',
  //       key2: 'value2',
  //     },
  //     notification: {
  //       title: 'Notification Title',
  //       body: 'Notification Body',
  //     },
  //   };

  //   try {
  //     const imageUrl = 'https://example.com/image.png'; // Optional image URL
  //     const result = await this.chatNotificationService.sendNotification(deviceId);
  //     console.log('Successfully sent push notification:', result);
  //   } catch (error) {
  //     console.log('실패했다아아아앙');
  //     console.error('Error sending push notification:', error);
  //   }
  // }
  // @Post('/multi')
  // async testNoti2() {
  //   const deviceTokens = [
  //     'DEVICE_REGISTRATION_TOKEN_1', // Replace with the actual FCM registration token of the target device 1
  //     'DEVICE_REGISTRATION_TOKEN_2', // Replace with the actual FCM registration token of the target device 2
  //     // Add more device tokens as needed...
  //   ];

  //   const payload = {
  //     data: {
  //       key1: 'value1',
  //       key2: 'value2',
  //     },
  //     notification: {
  //       title: 'Notification Title',
  //       body: 'Notification Body',
  //     },
  //   };

  //   try {
  //     const imageUrl = 'https://example.com/image.png'; // Optional image URL
  //     const result = await this.signalNotificationService.sendNotification(deviceTokens, payload, imageUrl);
  //     console.log('Successfully sent push notifications:', result);
  //   } catch (error) {
  //     console.error('Error sending push notifications:', error);
  //   }
  // }
}
