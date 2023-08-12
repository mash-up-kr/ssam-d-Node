import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Keyword } from 'src/domains/keyword';
import { UserKeyword } from 'src/domains/user-keyword';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class UserKeywordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: number, keywordIds: number[], transaction?: PrismaTransaction): Promise<void> {
    const prisma = transaction ?? this.prisma;

    const data = keywordIds.map(keywordId => ({ userId, keywordId }));
    await prisma.userKeyword.createMany({ data });
  }

  async delete(userId: number, transaction?: PrismaTransaction) {
    const prisma = transaction ?? this.prisma;

    await prisma.userKeyword.deleteMany({ where: { userId } });
  }

  /**
   * @todo raw query 안쓰게 바꿔보기
   * @deprecated 2023.07.17 키워드 추가 로직 변경으로 사용 안함
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

  async getMatchingInfoForSignal(senderId: number, keyword: string[]): Promise<UserKeyword[]> {
    const joinedKeyword = Prisma.join(keyword);
    const matchingInfo: UserKeyword[] = await this.prisma.$queryRaw`
        SELECT uk.user_id as userId, GROUP_CONCAT(k.name) AS keywords
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
    console.log('Start-----------------');
    console.log(`sender id : ${senderId}`);
    console.log('키워드 파라미터');
    console.log(joinedKeyword);
    console.log('유저 키워드 결과');
    console.log(userKeywords);
    console.log('End-----------------');
    return userKeywords;
  }

  async getSubscribingKeywords(userId: number, transaction?: PrismaTransaction): Promise<string[]> {
    const prisma = transaction ?? this.prisma;

    const userKeywords = await prisma.userKeyword.findMany({ include: { keyword: true }, where: { userId } });
    return userKeywords.map(userKeyword => userKeyword.keyword.name);
  }
}
