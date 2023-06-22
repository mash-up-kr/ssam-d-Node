import { Injectable } from '@nestjs/common';
import { Keyword } from 'src/domains/keyword';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KeywordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async add(keywords: Pick<Keyword, 'name'>[]): Promise<void> {
    await this.prisma.keyword.createMany({
      data: keywords,
      skipDuplicates: true,
    });
  }

  async getList(keywords: string[]) {
    const keywordEntities = await this.prisma.keyword.findMany({ where: { name: { in: keywords } } });
    return keywordEntities.map(keywordEntity => new Keyword(keywordEntity));
  }
}
