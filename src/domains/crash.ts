export class Crash {
  readonly id: number;
  readonly content: string;
  readonly keywords: string;
  readonly userId: number;

  constructor(crash) {
    this.id = crash.id;
    this.content = crash.content;
    this.keywords = crash.keywords;
    this.userId = crash.userId;
  }
}
