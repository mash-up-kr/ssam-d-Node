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
  recentSigalContent: string;

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
  recentSignalMillis: number;

  /**
   *
   * TODO: room에서 읽은 편지인지 아닌지 여부 필요한지 고민
   * isRead: boolean;
   */

  constructor({ id, keywords, recentSigalContent, matchingKeywordCount, profileImage, recentSignalMillis }) {
    this.id = id;
    this.keywords = keywords;
    this.recentSigalContent = recentSigalContent;
    this.matchingKeywordCount = matchingKeywordCount;
    this.profileImage = profileImage;
    this.recentSignalMillis = recentSignalMillis;
  }
}
