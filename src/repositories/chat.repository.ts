import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Chat } from 'src/domains/chat';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(chat: Chat, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;

    await prisma.chat.create({ data: chat });
  }

  async saveAll(chatData: Prisma.ChatUncheckedCreateInput[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.chat.createMany({ data: chatData });
  }

  async getListByRoomId(roomId: number): Promise<Chat[]> {
    const chats = await this.prisma.chat.findMany({
      where: { roomId },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return chats.map(chat => new Chat(chat));
  }
}
