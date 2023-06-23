export class UserKeyword {
  private readonly _userId: number;
  private readonly _keywords: string[];

  constructor(userKeyword) {
    this._userId = userKeyword.id;
    this._keywords = userKeyword.keywords;
  }

  get userId(): number {
    return this._userId;
  }
  get keywords(): string[] {
    return this._keywords;
  }
}
