import { IsArray } from 'class-validator';
import { SignalResDto } from 'src/modules/signal/dto/signal-res-dto';

export class PageResDto<T> {
  /**
   * 페이지길이
   * @readonly
   * @type {number}
   * @example 3
   */
  readonly pageLength: number;

  /**
   *
   *시그널 총 개수
   * @readonly
   * @type {number}
   * @example 6
   */
  readonly totalCount: number;

  /**
   *
   *총 페이지 개수
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly totalPage: number;

  /**
   *시그널 정보 목록
   * @readonly
   * @type {T[]}
   * @example
   *
   *      [
   *       {
   *         "signalId": 2,
   *         "receiverId": 3,
   *         "senderId": 2,
   *         "senderName": "혜온",
   *         "senderProfileImageUrl": "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png",
   *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
   *         "keywords": [
   *                 "사과"
   *            ],
   *         "keywordsCount": 1,
   *        "signalMillis": 1688622273578
   *       },
   *       {
   *         "signalId": 2,
   *         "receiverId": 3,
   *         "senderId": 2,
   *         "senderName": "혜온",
   *         "senderProfileImageUrl": "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png",
   *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
   *         "keywords": [
   *                 "사과"
   *            ],
   *         "keywordsCount": 1,
   *        "signalMillis": 1688622273578
   *       },
   *       {
   *         "signalId": 2,
   *         "receiverId": 3,
   *         "senderId": 2,
   *         "senderName": "혜온",
   *         "senderProfileImageUrl": "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png",
   *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
   *         "keywords": [
   *                 "사과"
   *            ],
   *         "keywordsCount": 1,
   *        "signalMillis": 1688622273578
   *       },
   *       {
   *         "signalId": 2,
   *         "receiverId": 3,
   *         "senderId": 2,
   *         "senderName": "혜온",
   *         "senderProfileImageUrl": "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png",
   *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
   *         "keywords": [
   *                 "사과"
   *            ],
   *         "keywordsCount": 1,
   *        "signalMillis": 1688622273578
   *       },
   *       {
   *         "signalId": 2,
   *         "receiverId": 3,
   *         "senderId": 2,
   *         "senderName": "혜온",
   *         "senderProfileImageUrl": "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png",
   *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
   *         "keywords": [
   *                 "사과"
   *            ],
   *         "keywordsCount": 1,
   *        "signalMillis": 1688622273578
   *       },
   *       {
   *         "signalId": 2,
   *         "receiverId": 3,
   *         "senderId": 2,
   *         "senderName": "혜온",
   *         "senderProfileImageUrl": "https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png",
   *         "content": "수업이 빨리 끝났으면 좋겠어요. 사과 먹고 싶어요",
   *         "keywords": [
   *                 "사과"
   *            ],
   *         "keywordsCount": 1,
   *        "signalMillis": 1688622273578
   *       }
   *     ]
   *
   */

  @IsArray()
  readonly list: T[];

  constructor(totalCount: number, pageLength: number, list: T[]) {
    this.pageLength = pageLength;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageLength);
    this.list = list;
  }
}
