import { Injectable } from '@nestjs/common';
import { Keyword } from 'src/domains/keyword';
import { ElasticSearchResponse, KeywordMap } from './keywords.type';
import { ConfigService } from '@nestjs/config';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { KeywordExtractException, UserNotFoundException } from 'src/exceptions';
import { UserKeyword } from 'src/domains/user-keyword';

@Injectable()
export class KeywordsService {
  /**
   * @description
   * 한국어 품사 태그 중에서 추천 키워드로서 뽑아낼 태크
   * https://docs.google.com/spreadsheets/d/1-9blXKjtjeKZqsf4NzHeYJCrr49-nXeRF6D80udfcwY/edit#gid=589544265
   */
  private readonly targetPOS = [
    'NNG(General Noun)', // 일반 명사
    'NNP(Proper Noun)', // 고유 명사
  ];

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly keywordRepository: KeywordRepository,
    private readonly userKeywordRepository: UserKeywordRepository
  ) {}

  async addUserKeywords(userId: number, plainKeywords: string[]): Promise<void> {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    await this.add(plainKeywords);

    const keywords = await this.getList(plainKeywords);
    const keywordIds = keywords.map(keyword => keyword.id);

    const unregisteredKeywords = await this.userKeywordRepository.getUnregisterdKeywords(userId, keywordIds);
    const unregisteredKeywordIds = unregisteredKeywords.map(keyword => keyword.id);

    await this.userKeywordRepository.add(userId, unregisteredKeywordIds);
  }

  async add(plainKeywords: string[]): Promise<void> {
    const keywordData = plainKeywords.map(keyword => ({ name: keyword }));
    await this.keywordRepository.add(keywordData);
  }

  async getList(plainKeywords: string[]): Promise<Keyword[]> {
    const keywords = await this.keywordRepository.getList(plainKeywords);
    return keywords;
  }

  async recommend(content: string): Promise<string[]> {
    const keywordMap = await this.extract(content);
    return Object.entries(keywordMap)
      .sort((a, b) => b[1] - a[1])
      .map(([keyword]) => keyword);
  }

  private async extract(content: string): Promise<KeywordMap> {
    try {
      const esHost = this.configService.get<string>('ELASTICSEARCH_URL');
      const response = await fetch(esHost, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenizer: 'nori_tokenizer',
          explain: true,
          text: [content],
        }),
      });

      const result: ElasticSearchResponse = await response.json();
      if (result.error) throw result.error;

      const tokens = result.detail.tokenizer.tokens;
      const keywords = tokens
        .filter(token => token.token.length > 1)
        .filter(token => this.targetPOS.includes(token.leftPOS))
        .map(token => token.token);

      const keywordMap: KeywordMap = keywords.reduce((dic, keyword) => {
        if (!dic[keyword]) dic[keyword] = 0;
        dic[keyword]++;
        return dic;
      }, {});

      return keywordMap;
    } catch (error) {
      throw new KeywordExtractException();
    }
  }
  async matchingUserByKeywords(senderId: number, keywords: string[]): Promise<UserKeyword[]> {
    const matchingInfo = await this.userKeywordRepository.getMatchingInfoForSignal(senderId, keywords);
    return matchingInfo;
  }
}
