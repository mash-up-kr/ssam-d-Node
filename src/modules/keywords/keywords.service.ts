import { Injectable } from '@nestjs/common';
import { Keyword } from 'src/domains/keyword';
import { KeywordRepository } from 'src/repositories';
import * as mecab from 'mecab-ya';
import { KeywordExtractException } from 'src/exceptions';

@Injectable()
export class KeywordsService {
  /**
   * @description
   * 한국어 품사 태그 중에서 추천 키워드로서 뽑아낼 태크
   * https://docs.google.com/spreadsheets/d/1-9blXKjtjeKZqsf4NzHeYJCrr49-nXeRF6D80udfcwY/edit#gid=589544265
   */
  private readonly targetPOS = [
    'NNG', // 일반 명사
    'NNP', // 고유 명사
  ];

  constructor(private readonly keywordRepository: KeywordRepository) {}

  async add(plainKeywords: string[]): Promise<void> {
    const keywordData = plainKeywords.map(keyword => ({ name: keyword }));
    await this.keywordRepository.add(keywordData);
  }

  async getList(plainKeywords: string[]): Promise<Keyword[]> {
    const keywords = await this.keywordRepository.getList(plainKeywords);
    return keywords;
  }

  async recommend(content: string) {
    const keywordDic = await this.extract(content);
    return Object.entries(keywordDic)
      .sort((a, b) => b[1] - a[1])
      .map(([keyword]) => keyword);
  }

  private async extract(content: string): Promise<KeywordDic> {
    return new Promise((resolve, reject) => {
      mecab.pos(content, (err: unknown, result: MecabOutput) => {
        if (err) reject(new KeywordExtractException());

        const keywords = result.filter(([_, form]) => this.targetPOS.includes(form)).map(([word]) => word);
        const keywordDic = keywords.reduce((dic, keyword) => {
          if (!dic[keyword]) dic[keyword] = 0;
          dic[keyword]++;
          return dic;
        }, {});
        resolve(keywordDic);
      });
    });
  }
}

type MecabOutput = string[][];
type KeywordDic = {
  [keyword: string]: number;
};
