import { Signal } from 'src/domains/signal';

/**
 * Represents a Signal response DTO.
 * @example
 *  {
 *     "list": [
 *       {
 *         "receiverId": 3,
 *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
 *         "keywords": "사과",
 *         "keywordsCount": 1
 *       },
 *       {
 *         "receiverId": 3,
 *         "content": "케이크 먹고 싶어요, 치즈케이크 TT",
 *         "keywords": "사과",
 *         "keywordsCount": 1
 *       },
 *       {
 *         "receiverId": 3,
 *         "content": "치즈케이크와 사과를 먹고 싶어요",
 *         "keywords": "사과",
 *         "keywordsCount": 1
 *       },
 *       {
 *         "receiverId": 3,
 *         "content": "치즈케이크와 사과를 먹고 싶어요",
 *         "keywords": "사과",
 *         "keywordsCount": 1
 *       },
 *       {
 *         "receiverId": 3,
 *         "content": "치즈케이크와 사과를 먹고 싶어요",
 *         "keywords": "사과",
 *         "keywordsCount": 1
 *       },
 *       {
 *         "receiverId": 3,
 *         "content": "치즈케이크와 사과를 먹고 싶어요",
 *         "keywords": "사과",
 *         "keywordsCount": 1
 *       }
 *     ]
 *   }
 */

export class SignalResDto {
  /**
   * 받는 사람 id
   * @readonly
   * @type {number}
   */
  readonly receiverId: number;

  /**
   *시그널 내용
   * @readonly
   * @type {string}
   */
  readonly content: string;

  /**
   *구독한 키워드와 일치한 키워드
   * @readonly
   * @type {string}
   */
  readonly keywords: string;

  /**
   *일치한 키워드 개수
   * @readonly
   * @type {number}
   */
  readonly keywordsCount: number;

  constructor(signal: Partial<Signal>) {
    this.receiverId = signal.receiverId;
    this.content = signal.content;
    this.keywords = signal.keywords;
    this.keywordsCount = signal.keywordsCount;
  }
}
