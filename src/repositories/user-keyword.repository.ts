import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Keyword } from 'src/domains/keyword';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserKeywordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: number, keywordIds: number[]): Promise<void> {
    const data = keywordIds.map(keywordId => ({ userId, keywordId }));
    await this.prisma.userKeyword.createMany({ data });
  }

  /**
   * @todo raw query 안쓰게 바꿔보기
   */
  async getUnregisterdKeywords(userId: number, keywordIds: number[]): Promise<Pick<Keyword, 'id'>[]> {
    const joinedKeywordIds = Prisma.join(keywordIds);
    const keywords: Pick<Keyword, 'id'>[] = await this.prisma.$queryRaw`
      SELECT
        keyword.id
      FROM
        keyword
        	LEFT OUTER JOIN (
        		SELECT
        			id, keyword_id
        		FROM
        			user_keyword
        		WHERE
        			user_id = ${userId}
        	) uk ON uk.keyword_id = keyword.id
      WHERE
        uk.id IS NULL AND
        keyword.id IN (${joinedKeywordIds})
    `;

    return keywords;
  }
}
