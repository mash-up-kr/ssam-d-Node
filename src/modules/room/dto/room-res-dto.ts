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
   * @example 닉네임
   */
  nickname: string;

  /**
   * @type {string}
   * @example https://kr.object.ncloudstorage.com/app-images/assets/img_profile_01.png
   */
  profileImage: string;

  /**
   * @type {boolean}
   * @example true
   */
  isAlive: boolean;

  /**
   * @type {boolean}
   * @example true
   */
  isChatRead: boolean;

  /**
   * @type {number}
   * @example 1687793263959
   */
  recentSignalReceivedTimeMillis: number;

  constructor({
    id,
    keywords,
    recentSignalContent,
    matchingKeywordCount,
    nickname,
    profileImage,
    isAlive,
    isChatRead,
    recentSignalReceivedTimeMillis,
  }) {
    this.id = id;
    this.keywords = keywords;
    this.recentSignalContent = recentSignalContent;
    this.matchingKeywordCount = matchingKeywordCount;
    this.nickname = nickname;
    this.profileImage = profileImage;
    this.isAlive = isAlive;
    this.isChatRead = isChatRead;
    this.recentSignalReceivedTimeMillis = recentSignalReceivedTimeMillis;
  }
}
