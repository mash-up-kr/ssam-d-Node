import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SignalReqDto {
  /**
   * 시그널 내용
   *
   * @type {string}
   * @example 빨리 종강했으면 좋겠다. 엽떡먹고 싶어
   */
  @IsString()
  content: string;

  /**
   *추출한 키워드 + 사용자 정의 키워드
   * @type {string[]}
   * @example ["종강", "엽떡", "대학생"]
   */
  @IsNotEmpty()
  @IsArray()
  keywords: string[];
}
