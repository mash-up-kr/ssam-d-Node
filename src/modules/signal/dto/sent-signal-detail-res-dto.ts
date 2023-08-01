import { MY_NICKNAME } from '../../../common/constants';

export class SentSignalDetailResDto {
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
   * @example 나
   */
  nickname: string;

  /**
   * @type {number}
   * @example 1687793263959
   */
  sentTimeMillis: number;

  constructor({ id, keywords, matchingKeywordCount, content, profileImage, sentTimeMillis }) {
    this.id = id;
    this.keywords = keywords;
    this.matchingKeywordCount = matchingKeywordCount;
    this.content = content;
    this.profileImage = profileImage;
    this.nickname = MY_NICKNAME;
    this.sentTimeMillis = sentTimeMillis;
  }
}
