import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Room } from 'src/domains/room';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(roomData: Prisma.RoomCreateInput, transaction?: PrismaTransaction): Promise<Room> {
    const prisma = transaction ?? this.prisma;
    const room = await prisma.room.create({
      data: roomData,
    });
    return new Room(room);
  }

  async get(room: Partial<Room>, transaction?: PrismaTransaction): Promise<Room | null> {
    const roomEntity = await this.prisma.room.findFirst({ where: room });
    if (!roomEntity) return null;
    return new Room(roomEntity);
  }
  async getList(roomIds: number[]): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany({ where: { id: { in: roomIds } } });
    return rooms.map(room => new Room(room));
  }

  async getRoomWithChatList(id: number): Promise<
    Prisma.RoomGetPayload<{
      include: {
        chat: true;
      };
    }>
  > {
    return await this.prisma.room.findFirst({
      where: { id },
      include: {
        chat: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }
  async deleteRoom(roomId: number, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await this.prisma.room.delete({ where: { id: roomId } });
  }

  async setIsAliveFalse(roomId: number, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await this.prisma.room.update({ where: { id: roomId }, data: { isAlive: false } });
  }
}
