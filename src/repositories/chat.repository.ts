import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Chat } from 'src/domains/chat';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(chat: Partial<Chat>): Promise<Chat | null> {
    const chatEntity = await this.prisma.chat.findFirst({ where: chat });
    if (!chatEntity) return null;

    return new Chat(chatEntity);
  }

  async save(chat: Chat, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;

    await prisma.chat.create({ data: chat });
  }

  async saveAll(chatData: Prisma.ChatUncheckedCreateInput[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.chat.createMany({ data: chatData });
  }

  async getListByRoomId(roomId: number, limit: number, offset: number): Promise<Chat[]> {
    const chats = await this.prisma.chat.findMany({
      take: limit,
      skip: offset,
      where: { roomId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return chats.map(chat => new Chat(chat));
  }

  async countChatByRoomId(roomId: number): Promise<number> {
    return await this.prisma.chat.count({ where: { roomId } });
  }
  async getMostRecentChat(roomId: number): Promise<Chat> {
    return await this.prisma.chat.findFirst({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
