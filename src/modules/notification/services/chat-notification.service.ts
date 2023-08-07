import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { DeviceTokenNotFoundException } from 'src/exceptions';
import { NotificationBaseService } from './notification.base.service';
import { RoomUserRepository, DeviceTokenRepository, UserRepository } from 'src/repositories';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

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
  constructor(
    private readonly notificationBaseService: NotificationBaseService,
    private readonly roomUserRepository: RoomUserRepository,
    private readonly deviceTokenRepository: DeviceTokenRepository,
    private readonly userRepository: UserRepository
  ) {}

  async sendChatNotification(senderId: number, roomId: number, content: string): Promise<BatchResponse> {
    const receiver = await this.roomUserRepository.getMatchingUser(senderId, roomId);
    const sender = await this.userRepository.get({ id: senderId });
    const deviceTokenObjects = await this.deviceTokenRepository.findAll(receiver.id);
    const deviceTokenValue = deviceTokenObjects.map(deviceTokenObject => deviceTokenObject.value);

    const payload: firebaseAdmin.messaging.MessagingPayload = {
      data: {
        roomId: roomId.toString(),
        notiType: 'CHAT',
        title: sender.nickname + '님이 보낸 메시지',
        body: content,
      },
    };
    const result: BatchResponse = await this.notificationBaseService.sendAll(deviceTokenValue, payload);
    return result;
  }
}
