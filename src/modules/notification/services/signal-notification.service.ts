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

  async sendNotification(deviceTokenIds: string[], matchingKeywords: string[], receivedTimeMillis: number) {
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

    const displayedMatchingKeywordString =
      matchingKeywords.length === 1
        ? matchingKeywords[0] + ' 키워드가 일치해요'
        : matchingKeywords[0].toString() + ' 외 ' + (matchingKeywords.length - 1).toString() + '개 키워드가 일치해요';
    const payload: firebaseAdmin.messaging.MessagingPayload = {
      data: {
        notiType: 'SIGNAL',
        title: '구독 키워드에 대한 시그널이 도착했어요2',
        body: displayedMatchingKeywordString,
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

  async makeNotificationString(matchingKeywords: string[]): Promise<string> {
    const MAX_DISPLAYING_KEYWORD_LENGTH = 12;

    if (matchingKeywords.length === 1) return matchingKeywords[0] + ' 키워드가 일치해요';
    let displayStringLength = 0;
    for (let i = 0; i < matchingKeywords.length; i++) {
      displayStringLength += matchingKeywords[i].length;
      if (displayStringLength > MAX_DISPLAYING_KEYWORD_LENGTH) {
        if (i === matchingKeywords.length - 1)
          return (
            matchingKeywords
              .slice(0, i + 1)
              .join(',')
              .substring(0, 12) +
            '...' +
            ' 키워드가 일치해요'
          );
        else {
          return (
            matchingKeywords.slice(0, i).join(',') +
            ' 외 ' +
            (matchingKeywords.length - (i + 1)).toString() +
            '개 키워드가 일치해요'
          );
        }
      }
      displayStringLength += 1; // 쉼표길이
    }

    return matchingKeywords.join(',') + ' 키워드가 일치해요';
  }
}
