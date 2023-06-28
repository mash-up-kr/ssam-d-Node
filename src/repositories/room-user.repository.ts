import { Injectable } from '@nestjs/common';
import { RoomUser } from 'src/domains/room-user';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/common';
import { Prisma } from '@prisma/client';
import { User } from 'src/domains/user';

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

  async getMatchingUser(userId: number, roomId: number): Promise<User> {
    const { user } = await this.prisma.roomUser.findFirst({
      where: {
        roomId,
        NOT: { userId },
      },
      include: {
        user: true,
      },
    });
    return new User(user);
  }

  async getRoomListData(
    userId: number,
    roomIds: number[]
  ): Promise<
    Array<
      Prisma.RoomUserGetPayload<{
        include: {
          user: { select: { profileImageUrl: true } };
          room: { include: { chat: true } };
        };
      }>
    >
  > {
    return await this.prisma.roomUser.findMany({
      where: {
        userId: { not: userId },
        roomId: { in: roomIds },
        room: { isAlive: true },
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
  }
}
