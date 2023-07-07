export class Signal {
  readonly id: number;
  readonly content: string;
  readonly keywords: string;
  readonly senderId: number;
  readonly receiverId: number;
  readonly roomId: number;
  readonly createdAt: Date;

  constructor(signal) {
    this.id = signal.id;
    this.content = signal.content;
    this.keywords = signal.keywords;
    this.senderId = signal.senderId;
    this.receiverId = signal.receiverId;
    this.roomId = signal.roomId;
    this.createdAt = signal.createdAt;
  }

  get keywordList(): string[] {
    const keyword = this.keywords.split(',');
    return keyword.map(item => item.trim());
  }

  get keywordsCount(): number {
    return this.keywordList.length;
  }
}
