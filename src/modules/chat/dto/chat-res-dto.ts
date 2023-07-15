export class ChatResDto {
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
   * @example 연날리기
   */
  senderName: string;

  /**
   * @type {number}
   * @example 1687793263959
   */
  receivedTimeMillis: number;

  constructor({ id, content, senderName, receivedTimeMillis }) {
    this.id = id;
    this.content = content;
    this.senderName = senderName;
    this.receivedTimeMillis = receivedTimeMillis;
  }
}
