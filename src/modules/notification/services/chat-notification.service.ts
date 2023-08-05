import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { DeviceTokenNotFoundException } from 'src/exceptions';
import { NotificationBaseService } from './notification.base.service';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}

/**
 * 시그널 도착했을때
 * 챗 도착했을 때
 * 서버에서 알림 줄 때
 *
 */
@Injectable()
export class ChatNotificationService {
  constructor(private readonly notificationBaseService: NotificationBaseService) {}

  async sendNotification(
    deviceTokenId: string,
    roomId: number,
    receivedTimeMillis: number,
    content: string,
    senderName: string
  ): Promise<string> {
    if (deviceTokenId.length === 0) {
      throw new DeviceTokenNotFoundException();
    }
    const payload: firebaseAdmin.messaging.MessagingPayload = {
      data: {
        roomId: roomId.toString(),
        notiType: 'CHAT',
        title: senderName + '님이 보낸 메시지',
        body: content,
      },
    };
    const result = await this.notificationBaseService.sendOne(deviceTokenId, payload);

    return result;
  }
}
