import { Injectable } from '@nestjs/common';
import { Keyword } from 'src/domains/keyword';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class KeywordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async add(keywords: Pick<Keyword, 'name'>[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;

    await prisma.keyword.createMany({
      data: keywords,
      skipDuplicates: true,
    });
  }

  async getList(keywords: string[], transaction?: PrismaTransaction) {
    const prisma = transaction ?? this.prisma;

    const keywordEntities = await prisma.keyword.findMany({ where: { name: { in: keywords } } });
    return keywordEntities.map(keywordEntity => new Keyword(keywordEntity));
  }
}
