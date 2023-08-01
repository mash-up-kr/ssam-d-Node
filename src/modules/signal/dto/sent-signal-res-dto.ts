import { MY_NICKNAME } from '../../../common/constants';

export class SentSignalResDto {
  /**
   * @type {number}
   * @example 1
   */
  id: number;

  /**
   * @type {string}
   * @example 안녕하세요. 반갑습니다. 저는 시그널입니다.
   */
  content: string;

  /**
   * @type {string}
   * @example 나
   */
  nickname: string;

  /**
   * @type {number}
   * @example 1687793263959
   */
  sentTimeMillis: number;

  constructor({ id, content, sentTimeMillis }) {
    this.id = id;
    this.content = content;
    this.nickname = MY_NICKNAME;
    this.sentTimeMillis = sentTimeMillis;
  }
}
