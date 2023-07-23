import { Injectable } from '@nestjs/common';
import { RoomUser } from 'src/domains/room-user';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from 'src/domains/user';
import { PrismaTransaction } from 'src/types/prisma.type';
import { RoomResDto } from '../modules/room/dto/room-res-dto';

@Injectable()
export class RoomUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveAll(roomUserData: Prisma.RoomUserUncheckedCreateInput[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.roomUser.createMany({
      data: roomUserData,
    });
  }

  async get(userId: number, roomId: number, transaction?: PrismaTransaction): Promise<RoomUser | null> {
    const prisma = transaction ?? this.prisma;

    const roomUser = await prisma.roomUser.findFirst({ where: { userId, roomId } });
    if (!roomUser) return null;
    return new RoomUser(roomUser);
  }

  async getRoomUsersByUserId(userId: number): Promise<RoomUser[]> {
    const roomUsers = await this.prisma.roomUser.findMany({
      where: { userId },
      include: { room: true },
    });
    return roomUsers.map(roomUser => new RoomUser(roomUser));
  }

  async getRoomUsersByRoomId(roomId: number, transaction?: PrismaTransaction): Promise<RoomUser[]> {
    const prisma = transaction ?? this.prisma;

    const roomUsers = await prisma.roomUser.findMany({
      where: { roomId, deletedAt: undefined },
    });
    return roomUsers.map(roomUser => new RoomUser(roomUser));
  }

  async getMatchingUser(userId: number, roomId: number, transaction: PrismaTransaction = null): Promise<User | null> {
    const prisma = transaction ?? this.prisma;

    const roomUser = await prisma.roomUser.findFirst({
      where: {
        roomId,
        deletedAt: undefined,
        NOT: { userId },
      },
      include: {
        user: true,
      },
    });
    if (!roomUser) return null;
    return new User(roomUser.user);
  }

  async getRoomList(userId: number, roomIds: number[], limit: number, offset: number): Promise<RoomResDto[]> {
    const roomUsers = await this.prisma.roomUser.findMany({
      take: limit,
      skip: offset,
      where: {
        userId: { not: userId },
        roomId: { in: roomIds },
        deletedAt: undefined,
      },
      include: {
        user: {
          select: {
            profileImageUrl: true,
            nickname: true,
          },
        },
        room: {
          include: {
            chat: {
              take: 1,
              orderBy: {
                createdAt: 'desc',
              },
            },
            roomUser: {
              where: { userId },
              select: { isChatRead: true },
            },
          },
        },
      },
    });
    return roomUsers
      .sort((a, b) => new Date(a.room.chat[0].createdAt).getTime() - new Date(b.room.chat[0].createdAt).getTime())
      .map(
        roomUser =>
          new RoomResDto({
            id: roomUser.room.id,
            keywords: roomUser.room.keywords.split(','),
            recentSignalContent: roomUser.room.chat[0].content,
            matchingKeywordCount: roomUser.room.keywords.split(',').length,
            nickname: roomUser.user.nickname,
            profileImage: roomUser.user.profileImageUrl,
            isAlive: roomUser.room.isAlive,
            isChatRead: roomUser.room.roomUser[0].isChatRead,
            recentSignalReceivedTimeMillis: new Date(roomUser.room.chat[0].createdAt).getTime(),
          })
      );
  }

  async updateIsChatRead(id: number, isChatRead: boolean, transaction: PrismaTransaction = null): Promise<void> {
    const prisma = transaction ?? this.prisma;

    await prisma.roomUser.update({
      where: { id },
      data: { isChatRead },
    });
  }

  async delete(userId: number, roomId: number, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.roomUser.deleteMany({ where: { userId, roomId } });
  }
}
