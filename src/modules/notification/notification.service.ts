import { Injectable, Logger } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}

@Injectable()
export class NotificationService {
  constructor(private readonly logger: Logger) {
    // For simplicity these credentials are just stored in the environment
    // However these should be stored in a key management system
    const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIAL_JSON);
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseCredentials),
    });
  }

  async sendNotification(
    deviceIds: Array<string>,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
    imageUrl?: string
  ) {
    if (deviceIds.length == 0) {
      throw new Error('You provide an empty device ids list!');
    }

    const body: firebaseAdmin.messaging.MulticastMessage = {
      tokens: deviceIds,
      data: payload?.data,
      notification: {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        imageUrl,
      },
      apns: {
        payload: {
          aps: {
            sound: payload?.notification?.sound,
            contentAvailable: silent ? true : false,
            mutableContent: true,
          },
        },
        fcmOptions: {
          imageUrl,
        },
      },
      android: {
        priority: 'high',
        ttl: 60 * 60 * 24,
        notification: {
          sound: payload?.notification?.sound,
        },
      },
    };

    let result = null;
    let failureCount = 0;
    let successCount = 0;
    const failedDeviceIds = [];

    while (deviceIds.length) {
      try {
        result = await firebaseAdmin.messaging().sendMulticast({ ...body, tokens: deviceIds.splice(0, 500) }, false);
        if (result.failureCount > 0) {
          const failedTokens = [];
          result.responses.forEach((resp, id) => {
            if (!resp.success) {
              failedTokens.push(deviceIds[id]);
            }
          });
          failedDeviceIds.push(...failedTokens);
        }
        failureCount += result.failureCount;
        successCount += result.successCount;
      } catch (error) {
        this.logger.error(error.message, error.stackTrace, 'nestjs-fcm');
        throw error;
      }
    }
    return { failureCount, successCount, failedDeviceIds };
  }
}
