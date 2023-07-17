export class Room {
  readonly id: number;
  readonly keywords: string;
  readonly isAlive: boolean;
  readonly createdAt: Date;
  readonly deleatedAt: Date;

  constructor({ id, keywords, isAlive, createdAt, deleatedAt }) {
    this.id = id;
    this.keywords = keywords;
    this.isAlive = isAlive;
    this.createdAt = createdAt;
    this.deleatedAt = room.deletedAt;
  }

  get keywordList(): string[] {
    const keyword = this.keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
