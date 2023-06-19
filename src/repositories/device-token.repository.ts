import { Injectable } from '@nestjs/common';
import { DeviceToken } from 'src/domains/device-token';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(deviceTokenText: string, userId: number): Promise<DeviceToken> {
    const deviceTokenData = { deviceToken: deviceTokenText, userId: userId };
    const deviceToken = await this.prisma.deviceToken.create({ data: deviceTokenData });

    return new DeviceToken(deviceToken);
  }

  async findDeviceToken(deviceTokenText: string): Promise<DeviceToken> {
    const deviceToken = await this.prisma.deviceToken.findUnique({ where: { deviceToken: deviceTokenText } });

    return new DeviceToken(deviceToken);
  }
  async upsert(deviceTokenText: string, userId: number): Promise<DeviceToken> {
    const deviceToken = await this.prisma.deviceToken.upsert({
      where: { deviceToken: deviceTokenText },
      update: { deviceToken: deviceTokenText },
      create: { deviceToken: deviceTokenText, userId: userId },
    });
    return new DeviceToken(deviceToken);
  }
}
