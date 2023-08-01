export class ReportReqDto {
  /**
   * 신고내용
   *
   * @type {string}
   * @example 부적잘한 글이에요.
   */
  content: string;

  /**
   * 신고할 유저 ID
   *
   * @type {number}
   * @example 1
   */
  reportedUserId: number;

  /**
   * 채팅방 ID
   *
   * @type {number}
   * @example 3
   */
  roomId: number;
}
