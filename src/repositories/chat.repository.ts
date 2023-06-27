import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Chat } from 'src/domains/chat';
import { Signal } from 'src/domains/signal';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/common';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(chatData: Prisma.ChatUncheckedCreateInput, transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.chat.create({ data: chatData });
  }

  async saveAll(chatData: Prisma.ChatUncheckedCreateInput[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;
    await prisma.chat.createMany({ data: chatData });
  }
}
