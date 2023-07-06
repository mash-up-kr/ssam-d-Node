export class Room {
  readonly id: number;
  readonly keywords: string;
  readonly isAlive: boolean;
  readonly createdAt: Date;

  constructor(room) {
    this.id = room.id;
    this.keywords = room.keywords;
    this.isAlive = room.isAlive;
    this.createdAt = room.createdAt;
  }

  get keywordList(): string[] {
    const keyword = this.keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
