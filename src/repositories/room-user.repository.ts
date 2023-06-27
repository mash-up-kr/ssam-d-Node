import { Injectable } from '@nestjs/common';
import { Signal } from 'src/domains/signal';
import { RoomUser } from 'src/domains/room-user';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoomUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveAll(roomUserData: Prisma.RoomUserUncheckedCreateInput[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.roomUser.createMany({
      data: roomUserData,
    });
  }

  async getRoomUsersByUserId(userId: number): Promise<RoomUser[]> {
    const roomUsers = await this.prisma.roomUser.findMany({ where: { userId }, include: { room: true, user: true } });
    return roomUsers.map(roomUser => new RoomUser(roomUser));
  }
}
