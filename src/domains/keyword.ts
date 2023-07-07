export class Keyword {
  readonly id: number;
  readonly name: string;

  constructor(keyword) {
    this.id = keyword.id;
    this.name = keyword.name;
  }
}
