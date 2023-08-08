import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { DeviceTokenNotFoundException } from 'src/exceptions';
import { ConfigService } from '@nestjs/config';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
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
export class NotificationBaseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly deviceTokenRepository: DeviceTokenRepository
  ) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: this.configService.get('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
        privateKey: this.configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/gm, '\n'),
      }),
    });
  }

  async sendNotification(deviceTokenIds: Array<string>, payload: firebaseAdmin.messaging.MessagingPayload) {
    if (deviceTokenIds.length === 0) {
      throw new DeviceTokenNotFoundException();
    }
    /**
     * sendMulticast는 최대 500개 전송 가능.
     */
    const MAX_BATCH_SIZE = 500;
    const totalDeviceCount = deviceTokenIds.length;

    for (let i = 0; i < totalDeviceCount; i += MAX_BATCH_SIZE) {
      const batchDeviceIds = deviceTokenIds.slice(i, i + MAX_BATCH_SIZE);

      await this.sendAll(batchDeviceIds, payload);
    }
  }
  async sendAll(deviceTokenIds: string[], payload: firebaseAdmin.messaging.MessagingPayload) {
    const body: firebaseAdmin.messaging.MulticastMessage = {
      tokens: deviceTokenIds,
      data: payload?.data,
    };

    const result: BatchResponse = await firebaseAdmin.messaging().sendEachForMulticast(body, false);
    await this.processNotificationResult(deviceTokenIds, result);
  }

  async sendOne(deviceTokenId: string, payload: firebaseAdmin.messaging.MessagingPayload): Promise<string> {
    const body: firebaseAdmin.messaging.Message = {
      token: deviceTokenId,
      data: payload?.data,
    };

    try {
      const result: string = await firebaseAdmin.messaging().send(body, false);
      return result;
    } catch (error) {
      console.log(error);
      console.log(deviceTokenId);
    }
  }

  async processNotificationResult(deviceTokens: string[], result: BatchResponse) {
    if (result.failureCount > 0) {
      const failedDeviceTokens = [];
      result.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedDeviceTokens.push(deviceTokens[idx]);
        }
      });
      await this.deviceTokenRepository.deleteMany(failedDeviceTokens);
    }
  }
}
