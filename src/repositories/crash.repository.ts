import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Crash } from 'src/domains/crash';
import { PrismaTransaction } from 'src/types/prisma.type';
@Injectable()
export class CrashRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(crashData: Partial<Crash>): Promise<void> {
    await this.prisma.crash.create({
      data: {
        userId: crashData.userId,
        content: crashData.content,
        keywords: crashData.keywords,
      },
    });
  }

  async getList(offset: number, limit: number, transaction: PrismaTransaction): Promise<Crash[]> {
    const prisma = transaction ?? this.prisma;

    const crashes = await prisma.crash.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return crashes.map(crash => new Crash(crash));
  }

  async getCount(transaction: PrismaTransaction): Promise<number> {
    const prisma = transaction ?? this.prisma;

    const count = await prisma.crash.count();
    return count;
  }
}
