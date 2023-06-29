import { Signal } from 'src/domains/signal';

export class SignalResDto {
  /**
   * 받는 사람 id
   * @readonly
   * @type {number}
   * @example 3
   */
  readonly receiverId: number;

  /**
   *시그널 내용
   * @readonly
   * @type {string}
   * @example 빠지가서 재밌게 놀아야지 라면도 먹어야지 고기도 먹어야지
   */
  readonly content: string;

  /**
   *구독한 키워드와 일치한 키워드
   * @readonly
   * @type {string}
   * @example "빠지","가평"
   */
  readonly keywords: string;

  /**
   *일치한 키워드 개수
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly keywordsCount: number;

  constructor(signal: Partial<Signal>) {
    this.receiverId = signal.receiverId;
    this.content = signal.content;
    this.keywords = signal.keywords;
    this.keywordsCount = signal.keywordsCount;
  }
}
