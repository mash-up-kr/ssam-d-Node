import { Injectable } from '@nestjs/common';
import { Signal } from 'src/domains/signal';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';
import { RoomRepository } from './room.repository';

@Injectable()
export class SignalRepository {
  constructor(private readonly prisma: PrismaService, private readonly roomRepository: RoomRepository) {}

  async save(signal: Exclude<Signal, 'id'>[]): Promise<void> {
    await this.prisma.signal.createMany({
      data: signal,
    });
  }

  async get(signalData: Partial<Signal>): Promise<Signal> {
    const signal = await this.prisma.signal.findFirst({ where: signalData });
    if (!signal) return null;
    return new Signal(signal);
  }

  async update(id: number, signalData: Partial<Signal>, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    console.log(signalData);
    await prisma.signal.update({ where: { id }, data: signalData });
  }

  async getList(receiverId: number): Promise<Partial<Signal[]>> {
    const signalListEntities = await this.prisma.signal.findMany({ where: { receiverId: receiverId } });
    return signalListEntities.map(signalEntity => new Signal(signalEntity));
  }
}
