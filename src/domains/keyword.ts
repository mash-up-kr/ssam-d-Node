export class Keyword {
  private readonly _id: number;
  private readonly _name: string;

  constructor(keyword) {
    this._id = keyword.id;
    this._name = keyword.name;
  }

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
}
