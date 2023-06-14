import { Injectable } from '@nestjs/common';
import { Keyword } from 'src/domains/keyword';
import { KeywordRepository } from 'src/repositories';

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
}
