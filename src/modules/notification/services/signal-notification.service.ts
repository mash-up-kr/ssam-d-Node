import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { DeviceTokenNotFoundException } from 'src/exceptions';
import { ConfigService } from '@nestjs/config';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
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
export class SignalNotificationService {
  constructor(private readonly notificationBaseService: NotificationBaseService) {}

  async sendNotification(deviceTokenIds: Array<string>, matchingKeywords: string[], receivedTimeMillis: number) {
    if (deviceTokenIds.length === 0) {
      throw new DeviceTokenNotFoundException();
    }
    /**
     * sendMulticast는 최대 500개 전송 가능.
     */
    const MAX_BATCH_SIZE = 500;
    const totalDeviceCount = deviceTokenIds.length;
    let failureCount = 0;
    let successCount = 0;
    const failedDeviceIds = [];

    const payload: firebaseAdmin.messaging.MessagingPayload = {
      data: {
        receivedTimeMillis: receivedTimeMillis.toString(),
      },
      /**
       * todo : content 잘라서 줘야하는지 물어보기
       */
      notification: {
        title: '구독 키워드에 대한 시그널이 도착했어요',
        body: matchingKeywords.join(',').length <= 12 ? '처리 나중에하자..' : '건회오빠한테 물어보자..',
        clickAction: '재성오빠가 알려주는 것',
      },
    };
    for (let i = 0; i < totalDeviceCount; i += MAX_BATCH_SIZE) {
      const batchDeviceIds = deviceTokenIds.slice(i, i + MAX_BATCH_SIZE);

      const result = await this.notificationBaseService.sendAll(batchDeviceIds, payload);
      if (result.failureCount > 0) {
        const failedTokens = [];
        result.responses.forEach((resp, id) => {
          if (!resp.success) {
            failedTokens.push(batchDeviceIds[id]);
          }
        });
        failedDeviceIds.push(...failedTokens);
      }
      failureCount += result.failureCount;
      successCount += result.successCount;
    }

    return { failureCount, successCount, failedDeviceIds };
  }
}
