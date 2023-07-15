export class SignalResDto {
  /**
   * 시그널 id
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly signalId: number;

  /**
   * 받는 사람 id
   * @readonly
   * @type {number}
   * @example 1
   */
  readonly receiverId: number;

  /**
   *보낸 사람 id
   * @readonly
   * @type {number}
   * @example 3
   */
  readonly senderId: number;

  /**
   * 보낸 사람 이름
   * @readonly
   * @type {string}
   * @example 혜온
   */
  readonly senderName: string;

  /**
   * 보낸사람 프로필이미지 링크
   * @readonly
   * @type {string}
   * @example "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png"
   */
  readonly senderProfileImageUrl: string;

  /**
   *시그널 내용
   * @readonly
   * @type {string}
   * @example 치즈케이크먹고 싶다. 성수동에 맛있는 카페 있는디
   */
  readonly content: string;

  /**
   *구독한 키워드와 일치한 키워드
   * @readonly
   * @type {string}
   * @example
   * [ "성수동","치즈케이크"]
   *
   */
  readonly keywords: string[];

  /**
   *일치한 키워드 개수
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly keywordsCount: number;

  /**
   *시그널 보낸 일자
   * @readonly
   * @type {string}
   * @example 1688622273578
   */
  readonly receivedTimeMillis: number;

  constructor({
    signalId,
    receiverId,
    senderId,
    senderName,
    senderProfileImageUrl,
    content,
    keywords,
    keywordsCount,
    receivedTimeMillis,
  }) {
    this.signalId = signalId;
    this.receiverId = receiverId;
    this.senderId = senderId;
    this.senderName = senderName;
    this.senderProfileImageUrl = senderProfileImageUrl;
    this.content = content;
    this.keywords = keywords;
    this.keywordsCount = keywordsCount;
    this.receivedTimeMillis = receivedTimeMillis;
  }
}
