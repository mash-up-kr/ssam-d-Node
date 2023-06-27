import { Injectable } from '@nestjs/common';
import { DeviceToken } from 'src/domains/device-token';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(deviceToken: string, userId: number): Promise<DeviceToken> {
    const savedDeviceToken = await this.prisma.deviceToken.create({
      data: { deviceToken: deviceToken, userId: userId },
    });

    return new DeviceToken(savedDeviceToken);
  }

  async findDeviceToken(deviceTokenText: string): Promise<DeviceToken> {
    const deviceToken = await this.prisma.deviceToken.findUnique({ where: { deviceToken: deviceTokenText } });

    return new DeviceToken(deviceToken);
  }
  async upsert(deviceToken: string, userId: number): Promise<DeviceToken> {
    const savedDeviceToken = await this.prisma.deviceToken.upsert({
      where: { deviceToken },
      update: { deviceToken },
      create: { deviceToken, userId },
    });
    return new DeviceToken(savedDeviceToken);
  }
}
