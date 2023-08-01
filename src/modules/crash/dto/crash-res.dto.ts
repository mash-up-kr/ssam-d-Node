export class CrashResDto {
  /**
   * @type {number}
   * @example 1
   */
  readonly id: number;

  /**
   * @type {number}
   * @example 아무와도 매칭되지 않은 시그널이여와요
   */
  readonly content: string;

  /**
   * @type {string}
   * @example 매쉬업, 노드, 안드로이드, 디자인
   */
  readonly keywords: string;

  /**
   * @type {number}
   * @example 1
   */
  readonly userId: number;

  constructor({ id, content, keywords, userId }) {
    this.id = id;
    this.content = content;
    this.keywords = keywords;
    this.userId = userId;
  }
}
