export class Trash {
  private readonly _id?: number;
  private readonly _content: string;
  private readonly _keywords: string;
  private readonly _userId: number;

  constructor(trash) {
    this._id = trash.id;
    this._content = trash.content;
    this._keywords = trash.keywords;
    this._userId = trash.userId;
  }

  get content(): string {
    return this._content;
  }
  get keywords(): string {
    return this._keywords;
  }
  get userId(): number {
    return this._userId;
  }
}
