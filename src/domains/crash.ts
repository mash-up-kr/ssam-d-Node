import { User } from './user';

export class Crash {
  readonly id: number;
  readonly content: string;
  readonly keywords: string;
  readonly userId: number;
  readonly user: User;
  readonly createdAt: Date;

  constructor(crash) {
    this.id = crash.id;
    this.content = crash.content;
    this.keywords = crash.keywords;
    this.userId = crash.userId;
    this.user = crash.user;
    this.createdAt = crash.createdAt;
  }
  get keywordList(): string[] {
    if (!this.keywords) return [];
    const keyword = this.keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
