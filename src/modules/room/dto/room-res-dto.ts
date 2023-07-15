export class RoomResDto {
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
   * @type {string}
   * @example 안녕하세요. 반갑습니다. 저는 시그널입니다.
   */
  recentSignalContent: string;

  /**
   * @type {number}
   * @example 3
   */
  matchingKeywordCount: number;

  /**
   * @type {string}
   * @example https://kr.object.ncloudstorage.com/app-images/assets/img_profile_01.png
   */
  profileImage: string;

  /**
   * @type {number}
   * @example 1687793263959
   */
  recentSignalReceivedTimeMillis: number;

  /**
   * @type {boolean}
   * @example true
   */
  isAlive: number;

  /**
   *
   * TODO: room에서 읽은 편지인지 아닌지 여부 필요한지 고민
   * isRead: boolean;
   */

  constructor({
    id,
    keywords,
    recentSignalContent,
    matchingKeywordCount,
    profileImage,
    recentSignalReceivedTimeMillis,
    isAlive,
  }) {
    this.id = id;
    this.keywords = keywords;
    this.recentSignalContent = recentSignalContent;
    this.matchingKeywordCount = matchingKeywordCount;
    this.profileImage = profileImage;
    this.recentSignalReceivedTimeMillis = recentSignalReceivedTimeMillis;
    this.isAlive = isAlive;
  }
}
