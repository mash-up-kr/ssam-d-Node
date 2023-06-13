import { Injectable } from '@nestjs/common';
import { Keyword } from 'src/domains/keyword';
import { KeywordRepository } from 'src/repositories';
import * as mecab from 'mecab-ya';

@Injectable()
export class KeywordsService {
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
        if (err) reject(err);
        const keywords = result.filter(([_, form]) => form === 'NNG').map(([word]) => word);
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
