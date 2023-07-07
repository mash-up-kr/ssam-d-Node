export class Page<T> {
  readonly pageLength: number;
  readonly totalCount: number;
  readonly totalPage: number;
  readonly object: T[];
  constructor(totalCount: number, pageLength: number, object: T[]) {
    this.pageLength = pageLength;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageLength);
    this.object = object;
  }
}
