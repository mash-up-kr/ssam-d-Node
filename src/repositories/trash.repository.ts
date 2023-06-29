import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Trash } from 'src/domains/trash';
@Injectable()
export class TrashRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(trashData: Partial<Trash>): Promise<void> {
    await this.prisma.trash.create({
      data: {
        userId: trashData.userId,
        content: trashData.content,
        keywords: trashData.keywords,
      },
    });
  }
}
