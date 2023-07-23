import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Crash } from 'src/domains/crash';
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
}
