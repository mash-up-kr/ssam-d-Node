import { throws } from 'assert';

export class Signal {
  private readonly _id: number;
  private readonly _content: string;
  private readonly _keywords: string;
  private readonly _senderId: number;
  private readonly _receiverId: number;
  private readonly _roomId: number;
  private readonly _createdAt: Date;

  constructor(signal) {
    this._id = signal.id;
    this._content = signal.content;
    this._keywords = signal.keywords;
    this._senderId = signal.senderId;
    this._receiverId = signal.receiverId;
    this._roomId = signal.roomId;
  }

  get id(): number {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get keywords(): string {
    return this._keywords;
  }

  get senderId(): number {
    return this._senderId;
  }

  get receiverId(): number {
    return this._receiverId;
  }

  get roomId(): number {
    return this._roomId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get keywordList(): string[] {
    const keyword = this._keywords.split(',');
    return keyword.map(item => item.trim());
  }
}
