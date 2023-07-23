export class RoomDetailResDto {
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
   * @example 유저네임
   */
  matchingUserName: string;

  /**
   * @type {string}
   * @example MINT
   */
  chatColor: string;

  /**
   * @type {string}
   * @example https://kr.object.ncloudstorage.com/app-images/assets/img_profile_01.png
   */
  matchingUserProfileImage: string;

  /**
   * @type {boolean}
   * @example true
   */
  isAlive: number;

  constructor({ id, keywords, matchingUserName, chatColor, matchingUserProfileImage, isAlive }) {
    this.id = id;
    this.keywords = keywords;
    this.matchingUserName = matchingUserName;
    this.chatColor = chatColor;
    this.matchingUserProfileImage = matchingUserProfileImage;
    this.isAlive = isAlive;
  }
}
