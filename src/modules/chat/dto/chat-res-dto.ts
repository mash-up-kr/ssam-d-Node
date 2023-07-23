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

  /**
   *
   *챗 컬러
   * @type {string}
   * @example MINT
   */
  chatColor: string;

  /**
   *
   * @type {boolean}
   * @example true
   */
  isMine: boolean;

  /**
   * 답장할 수 있는지 여부
   * @type {boolean}
   * @example true
   */
  isReplyEnable: boolean;

  constructor({ id, content, senderName, receivedTimeMillis, chatColor, isMine, isReplyEnable }) {
    this.id = id;
    this.content = content;
    this.senderName = senderName;
    this.receivedTimeMillis = receivedTimeMillis;
    this.chatColor = chatColor;
    this.isMine = isMine;
    this.isReplyEnable = isReplyEnable;
  }
}
