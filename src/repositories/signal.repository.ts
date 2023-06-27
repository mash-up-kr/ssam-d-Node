import { Injectable } from '@nestjs/common';
import { Signal } from 'src/domains/signal';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/common';
import { RoomRepository } from './room.repository';

@Injectable()
export class SignalRepository {
  constructor(private readonly prisma: PrismaService, private readonly roomRepository: RoomRepository) {}

  async save(signal: Exclude<Signal, 'id'>[]): Promise<void> {
    await this.prisma.signal.createMany({
      data: signal,
      skipDuplicates: true,
    });
  }

  async get(signamData: Partial<Signal>): Promise<Signal> {
    const signal = this.prisma.signal.findFirst({ where: signamData });
    console.log(signal);
    if (!signal) return null;
    return new Signal(signal);
  }

  async update(id: number, signalData: Partial<Signal>, transaction?: PrismaTransaction): Promise<Signal> {
    const prisma = transaction ?? this.prisma;
    const signal = await prisma.signal.update({ where: { id }, data: signalData });
    return new Signal(signal);
  }
}
