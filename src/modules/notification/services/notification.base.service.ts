import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { DeviceTokenNotFoundException } from 'src/exceptions';
import { ConfigService } from '@nestjs/config';
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
export class NotificationBaseService {
  constructor(private readonly configService: ConfigService) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: this.configService.get('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
        privateKey: this.configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/gm, '\n'),
      }),
    });
  }

  async sendNotification(
    deviceTokenIds: Array<string>,
    payload: firebaseAdmin.messaging.MessagingPayload,
    imageUrl?: string
  ) {
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

    for (let i = 0; i < totalDeviceCount; i += MAX_BATCH_SIZE) {
      const batchDeviceIds = deviceTokenIds.slice(i, i + MAX_BATCH_SIZE);

      const result = await this.sendAll(batchDeviceIds, payload);

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

      /**
       * 클라이언트 구현 전까지 임시로 보기 위해서
       *
       */
      console.log('failureCount' + failureCount);
      console.log('successCount' + successCount);
    }

    return { failureCount, successCount, failedDeviceIds };
  }
  async sendAll(batchDeviceIds: string[], payload: firebaseAdmin.messaging.MessagingPayload): Promise<BatchResponse> {
    const body: firebaseAdmin.messaging.MulticastMessage = {
      tokens: batchDeviceIds,
      data: payload?.data,
      notification: {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      },

      android: {
        priority: 'high',
        ttl: 60 * 60 * 24,
        notification: {
          sound: payload?.notification?.sound,
        },
      },
    };

    try {
      const result: BatchResponse = await firebaseAdmin.messaging().sendEachForMulticast(body, false);
      return result;
    } catch (error) {
      /**
       * Todo: Logger ,error
       */
      throw error;
    }
  }

  async sendOne(deviceTokenId: string, payload: firebaseAdmin.messaging.MessagingPayload): Promise<string> {
    const body: firebaseAdmin.messaging.Message = {
      token: deviceTokenId,
      data: payload?.data,
      notification: {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      },

      android: {
        priority: 'high',
        ttl: 60 * 60 * 24,
        notification: {
          sound: payload?.notification?.sound,
        },
      },
    };

    try {
      const result = await firebaseAdmin.messaging().send(body, false);
      return result;
    } catch (error) {
      /**
       * Todo: Logger ,error
       */
      throw error;
    }
  }
}
