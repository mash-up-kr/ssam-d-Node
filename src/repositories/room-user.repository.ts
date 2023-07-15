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
      where: {
        userId,
        room: {
          isAlive: true,
        },
      },
      include: {
        room: true,
      },
    });
    return roomUsers.map(roomUser => new RoomUser(roomUser));
  }

  async getMatchingUser(userId: number, roomId: number): Promise<User | null> {
    const roomUser = await this.prisma.roomUser.findFirst({
      where: {
        roomId,
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
      },
      include: {
        user: {
          select: {
            profileImageUrl: true,
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
          },
        },
      },
    });
    return roomUsers.map(
      roomUser =>
        new RoomResDto({
          id: roomUser.id,
          keywords: roomUser.room.keywords.split(','),
          recentSignalContent: roomUser.room.chat[0].content,
          matchingKeywordCount: roomUser.room.keywords.split(',').length,
          profileImage: roomUser.user.profileImageUrl,
          recentSignalReceivedTimeMillis: new Date(roomUser.room.chat[0].createdAt).getTime(),
          isAlive: roomUser.room.isAlive,
        })
    );
  }
}
