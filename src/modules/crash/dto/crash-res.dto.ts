import { Crash } from 'src/domains/crash';

export class CrashResDto {
  /**
   * @type {number}
   * @example 1
   */
  readonly id: number;

  /**
   * @type {number}
   * @example 아무와도 매칭되지 않은 시그널이여와요
   */
  readonly content: string;

  /**
   * @type {string[]}
   * @example 매쉬업, 노드, 안드로이드, 디자인
   */
  readonly keywords: string[];

  /**
   * @type {number}
   * @example 1
   */
  readonly userId: number;

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
   * @type {string}
   * @example 연날리기
   */
  nickname: string;

  /**
   * @type {number}
   * @example 1687793263959
   */
  receivedTimeMillis: number;

  constructor({ id, content, keywords, userId, matchingKeywordCount, nickname, profileImage, receivedTimeMillis }) {
    this.id = id;
    this.content = content;
    this.keywords = keywords;
    this.userId = userId;

    this.matchingKeywordCount = matchingKeywordCount;
    this.nickname = nickname;
    this.profileImage = profileImage;
    this.receivedTimeMillis = receivedTimeMillis;
  }

  static fromDomain(crash: Crash): CrashResDto {
    return new CrashResDto({
      id: crash.id,
      content: crash.content,
      keywords: crash.keywordList,
      userId: crash.userId,
      matchingKeywordCount: crash.keywordList.length ?? 0,
      nickname: crash.user.nickname,
      profileImage: crash.user.profileImageUrl,
      receivedTimeMillis: crash.createdAt.getTime(),
    });
  }
}
