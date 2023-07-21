export class UserKeyword {
  readonly userId: number;
  readonly keywords: string;

  constructor(userKeyword) {
    this.userId = userKeyword.userId;
    this.keywords = userKeyword.keywords;
  }
}
