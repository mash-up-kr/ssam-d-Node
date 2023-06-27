export class Chat {
  private readonly _id: number;
  private readonly _content: string;
  private readonly _roomId: number;
  private readonly _senderId: number;
  private readonly _createdAt: Date;

  constructor(chat) {
    this._id = chat.id;
    this._content = chat.content;
    this._roomId = chat.roomId;
    this._senderId = chat.senderId;
    this._createdAt = chat._createdAt;
  }

  get id(): number {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get roomId(): number {
    return this._roomId;
  }

  get senderId(): number {
    return this._senderId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
