import { Injectable } from '@nestjs/common';
import { Signal } from 'src/domains/signal';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class SignalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(signal: Exclude<Signal, 'id'>[]): Promise<void> {
    await this.prisma.signal.createMany({
      data: signal,
    });
  }

  async get(signalData: Partial<Signal>): Promise<Signal | null> {
    const signal = await this.prisma.signal.findFirst({ where: signalData });
    if (!signal) return null;
    return new Signal(signal);
  }

  async update(id: number, signalData: Partial<Signal>, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.signal.update({ where: { id }, data: signalData });
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.signal.delete({ where: { id } });
  }

  async getList(receiverId: number, limit: number, offset: number): Promise<Partial<Signal[]>> {
    const signalListEntities = await this.prisma.signal.findMany({
      take: limit,
      skip: offset,
      where: {
        receiverId: receiverId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return signalListEntities.map(signalEntity => new Signal(signalEntity));
  }

  async countSignalsById(receiverId: number): Promise<number> {
    return await this.prisma.signal.count({ where: { receiverId: receiverId } });
  }
}
