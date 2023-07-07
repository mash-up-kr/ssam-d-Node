export class Chat {
  readonly id: number;
  readonly content: string;
  readonly roomId: number;
  readonly senderId: number;
  readonly createdAt: Date;

  constructor(chat: Partial<Chat>) {
    this.id = chat.id;
    this.content = chat.content;
    this.roomId = chat.roomId;
    this.senderId = chat.senderId;
    this.createdAt = chat.createdAt;
  }
}
