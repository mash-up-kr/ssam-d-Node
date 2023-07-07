export class UserKeyword {
  readonly userId: number;
  readonly keywords: string;
  readonly count: string;

  constructor(userKeyword) {
    this.userId = userKeyword.id;
    this.keywords = userKeyword.keywords;
    this.count = userKeyword.count;
  }
}
