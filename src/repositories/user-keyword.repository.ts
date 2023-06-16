import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserKeywordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: number, keywordIds: number[]): Promise<void> {
    const data = keywordIds.map(keywordId => ({ userId, keywordId }));
    await this.prisma.userKeywords.createMany({ data });
  }
}
