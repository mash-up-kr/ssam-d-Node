import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Keyword } from 'src/domains/keyword';
import { UserKeyword } from 'src/domains/user-keyword';
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
  /**
   * 함수 이름이 적절한지
   */
  async getMatchingInfoForSignal(keyword: string[]): Promise<Pick<UserKeyword, 'userId'>[]> {
    const joinedKeyword = Prisma.join(keyword);
    const matchingInfo: Pick<UserKeyword, 'userId'>[] = await this.prisma.$queryRaw`
    SELECT 
      uk.user_id, ARRAY_AGG(uk.name) AS matchingKeywords
    FROM 
      user_keyword uk
    WHERE 
      uk.keywordId IN (${joinedKeyword})
    GROUP BY 
      uk.userId
    HAVING 
      COUNT(DISTINCT uk.keywordId) > 0
    `;
    return matchingInfo;
  }
}
