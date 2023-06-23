import { IsString, IsNumber } from 'class-validator';

export class SignalReqDto {
  @IsNumber()
  senderId: number;
  /**
   * 시그널 내용
   *
   * @type {string}
   * @example 빨리 종강했으면 좋겠다. 엽떡먹고 싶어
   */
  @IsString()
  content: string;

  /**
   *
   * @type {string[]}
   * @example ["종강", "엽떡", "대학생"]
   */
  keywords: string[];
}
