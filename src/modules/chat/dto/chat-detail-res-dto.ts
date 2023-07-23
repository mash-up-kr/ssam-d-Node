export class ChatDetailResDto {
  /**
   * @type {number}
   * @example 1
   */
  id: number;

  /**
   * @type {string[]}
   * @example ["매쉬업", "노드", "안드로이드", "디자인"]
   *
   */
  keywords: string[];

  /**
   * @type {number}
   * @example 3
   */
  matchingKeywordCount: number;

  /**
   * @type {string}
   * @example 안녕하세요. 반갑습니다. 저는 시그널입니다.
   */
  content: string;

  /**
   * @type {string}
   * @example https://kr.object.ncloudstorage.com/app-images/assets/img_profile_01.png
   */
  profileImage: string;

  /**
   * @type {string}
   * @example 연날리기
   */
  nickname: string;

  /**
   * @type {boolean}
   * @example true
   */
  isAlive: number;

  /**
   * @type {boolean}
   * @example true
   */
  isMine: number;

  /**
   * @type {number}
   * @example 1687793263959
   */
  receivedTimeMillis: number;

  /**
   * 답장할 수 있는지 여부
   * @type {boolean}
   */
  isReplyable: boolean;

  constructor({
    id,
    keywords,
    matchingKeywordCount,
    content,
    profileImage,
    nickname,
    isAlive,
    isMine,
    receivedTimeMillis,
    isReplyable,
  }) {
    this.id = id;
    this.keywords = keywords;
    this.matchingKeywordCount = matchingKeywordCount;
    this.content = content;
    this.profileImage = profileImage;
    this.nickname = nickname;
    this.isAlive = isAlive;
    this.isMine = isMine;
    this.receivedTimeMillis = receivedTimeMillis;
    this.isReplyable = isReplyable;
  }
}
