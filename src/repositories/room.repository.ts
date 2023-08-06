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
    const prisma = transaction ?? this.prisma;

    const roomEntity = await prisma.room.findFirst({ where: room });
    if (!roomEntity) return null;
    return new Room(roomEntity);
  }

  async getRoomIdsByUserId(userId: number, transaction?: PrismaTransaction): Promise<number[]> {
    const prisma = transaction ?? this.prisma;

    const rooms: Pick<Room, 'id'>[] = await prisma.$queryRaw`
    SELECT r.id
      FROM room r
      JOIN room_user ru ON r.id = ru.room_id
     WHERE ru.user_id = ${userId}
  `;
    return rooms.map(room => room.id);
  }

  async update(id: number, room: Prisma.RoomUpdateInput, transaction?: PrismaTransaction) {
    const prisma = transaction ?? this.prisma;

    const roomEntity = await prisma.room.update({ where: { id }, data: room });
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
    await prisma.room.delete({ where: { id: roomId } });
  }

  async setIsAliveFalse(roomId: number, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.room.update({ where: { id: roomId }, data: { isAlive: false } });
  }
}
