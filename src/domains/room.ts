export class Room {
  readonly id: number;
  readonly keywords: string;
  readonly isAlive: boolean;
  readonly createdAt: Date;

  constructor({ id, keywords, isAlive, createdAt }) {
    this.id = id;
    this.keywords = keywords;
    this.isAlive = isAlive;
    this.createdAt = createdAt;
  }

  get keywordList(): string[] {
    const keyword = this.keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
