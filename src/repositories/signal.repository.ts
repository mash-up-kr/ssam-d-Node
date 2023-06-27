import { Injectable } from '@nestjs/common';
import { Signal } from 'src/domains/signal';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SignalRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(signal: Exclude<Signal, 'id'>[]): Promise<void> {
    await this.prisma.signal.createMany({
      data: signal,
    });
  }
  async get(receiverId: number): Promise<Partial<Signal[]>> {
    const signalListEntities = await this.prisma.signal.findMany({ where: { receiverId: receiverId } });
    return signalListEntities.map(signalEntity => new Signal(signalEntity));
  }
}
