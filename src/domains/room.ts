export class Room {
  private readonly _id: number;
  private readonly _keywords: string;
  private readonly _isAlive: boolean;
  private readonly _createdAt: Date;

  constructor(room) {
    this._id = room.id;
    this._keywords = room.keywords;
    this._isAlive = room.isAlive;
    this._createdAt = room.createdAt;
  }

  get id(): number {
    return this._id;
  }

  get keywords(): string {
    return this._keywords;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get keywordList(): string[] {
    const keyword = this._keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
