export class Room {
  readonly id: number;
  readonly keywords: string;
  readonly isAlive: boolean;
  readonly createdAt: Date;
  readonly deleatedAt: Date;

  constructor({ id, keywords, isAlive, createdAt, deletedAt }) {
    this.id = id;
    this.keywords = keywords;
    this.isAlive = isAlive;
    this.createdAt = createdAt;
    this.deleatedAt = deletedAt;
  }

  get keywordList(): string[] {
    if (!this.keywords) return [];
    const keyword = this.keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
