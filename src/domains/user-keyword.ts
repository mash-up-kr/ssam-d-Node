export class UserKeyword {
  private readonly _userId: number;
  private readonly _keywords: string[];
  private readonly _count: string;

  constructor(userKeyword) {
    this._userId = userKeyword.id;
    this._keywords = userKeyword.keywords;
    this._count = userKeyword.count;
  }

  get userId(): number {
    return this._userId;
  }
  get keywords(): string[] {
    return this._keywords;
  }
  get count(): string {
    return this._count;
  }
}
