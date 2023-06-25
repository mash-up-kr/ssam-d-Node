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
    console.log(joinedKeywordIds);
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

  async getMatchingInfoForSignal(senderId: number, keyword: string[]): Promise<UserKeyword[]> {
    const joinedKeyword = Prisma.join(keyword);
    const matchingInfo: UserKeyword[] = await this.prisma.$queryRaw`
        SELECT uk.user_id AS id , GROUP_CONCAT(k.name) AS keywords, COUNT(k.name) AS count
          FROM user_keyword uk
          JOIN (
            SELECT *
            FROM keyword 
            WHERE name IN (${joinedKeyword})
          ) k ON uk.keyword_id = k.id
         WHERE uk.user_id != ${senderId}
      GROUP BY uk.user_id
      `;

    const userKeywords: UserKeyword[] = matchingInfo.map(data => new UserKeyword(data));

    return userKeywords;
  }
}
