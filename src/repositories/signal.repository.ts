import { Injectable } from '@nestjs/common';
import { Signal } from 'src/domains/signal';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SignalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(signal: Exclude<Signal, 'id'>[]): Promise<void> {
    await this.prisma.signal.createMany({
      data: signal,
      skipDuplicates: true,
    });
  }

  async getById(id: number): Promise<Signal> {
    const signal = this.prisma.signal.findFirst({ where: { id } });
    if (!signal) return null;
    return new Signal(signal);
  }

  async replyFirstSignal(signalId: number, senderId: number, content: string, keywords: string): Promise<void> {
    this.prisma.$transaction(async prisma => {
      const room = await prisma.room.create({
        data: {
          keywords: keywords,
        },
      });

      const firstSignal = await prisma.signal.update({
        where: { id: signalId },
        data: { roomId: room.id },
      });

      const receiverId = firstSignal.senderId;
      await prisma.roomUser.createMany({
        data: [
          {
            roomId: room.id,
            userId: receiverId,
          },
          {
            roomId: room.id,
            userId: senderId,
          },
        ],
      });

      await prisma.chat.create({
        data: {
          roomId: room.id,
          content: firstSignal.content,
          senderId: firstSignal.senderId,
          createdAt: firstSignal.createdAt,
        },
      });

      const chat = await prisma.chat.create({
        data: {
          roomId: room.id,
          content: content,
          senderId: senderId,
        },
      });
    });
  }
}
