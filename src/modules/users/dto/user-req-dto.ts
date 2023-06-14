import { PickType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';

//회원가입
export class UserReqDto {
  /**
   * 닉네임
   * @example 쌈디
   */
  nickname: string;
  @IsEmail()
  email: string;
  provider: string;
}

export class UserOnboardingReqDto {
  nickname: string;

  /**
   * 입력한 키워드
   * @example
   * ["매쉬업", "노드", "안드로이드", "디자인"]
   */
  keywords: string[];
}
