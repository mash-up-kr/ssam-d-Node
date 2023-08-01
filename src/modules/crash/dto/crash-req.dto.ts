import { IsString } from 'class-validator';

export class CrashReqDto {
  /**
   * 시그널 내용
   *
   * @type {string}
   * @example 빨리 종강했으면 좋겠다. 엽떡먹고 싶어
   */
  @IsString()
  content: string;
}
