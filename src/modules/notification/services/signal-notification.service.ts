import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { DeviceTokenNotFoundException } from 'src/exceptions';
import { ConfigService } from '@nestjs/config';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { NotificationBaseService } from './notification.base.service';
import { Signal } from 'src/domains/signal';
import { DeviceTokenRepository } from 'src/repositories';

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
export class SignalNotificationService {
  constructor(
    private readonly notificationBaseService: NotificationBaseService,
    private readonly deviceTokenRepository: DeviceTokenRepository
  ) {}

  async sendSignalNotification(signal: Signal[]): Promise<void> {
    for (let i = 0; i < signal.length; i++) {
      const receiverId: number = signal[i].receiverId;
      const deviceTokenObjects = await this.deviceTokenRepository.findAll(receiverId);
      const deviceTokenValue = deviceTokenObjects.map(deviceTokenObject => deviceTokenObject.value);

      if (!deviceTokenValue) continue;
      const keyword = signal[i].keywords.split(',');
      const keywordList = keyword.map(item => item.trim());
      const displayedMatchingKeywordString =
        keywordList.length === 1
          ? keywordList[0] + ' 키워드가 일치해요'
          : keywordList[0].toString() + ' 외 ' + (keywordList.length - 1).toString() + '개 키워드가 일치해요';

      const payload: firebaseAdmin.messaging.MessagingPayload = {
        data: {
          notiType: 'SIGNAL',
          title: '구독 키워드에 대한 시그널이 도착했어요',
          body: displayedMatchingKeywordString,
        },
      };

      await this.notificationBaseService.sendAll(deviceTokenValue, payload);
    }
  }
}
