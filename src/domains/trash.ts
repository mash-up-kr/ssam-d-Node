export class Trash {
  readonly id: number;
  readonly content: string;
  readonly keywords: string;
  readonly userId: number;

  constructor(trash) {
    this.id = trash.id;
    this.content = trash.content;
    this.keywords = trash.keywords;
    this.userId = trash.userId;
  }
}
