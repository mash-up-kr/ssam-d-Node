import { PickType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

//회원가입
export class LoginReqDto {
  /**
   * 닉네임
   *
   * @type {string}
   * @example 혜온
   *
   */
  nickname: string;

  /**
   * 이메일
   *
   * @type {string}
   * @example ain0103@naver.com
   */
  @IsEmail()
  email: string;

  /**
   *카카오 회원 아이디
   * @type {string}
   * @example 0342
   */
  socialId: string;

  /**
   *
   *소셜로그인 종류
   * @type {string}
   * @example KAKAO
   */
  provider: string;
}

//export class UserNameReqDto extends PickType(UserReqDto, ['email']) {}
