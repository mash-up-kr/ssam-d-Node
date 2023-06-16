import { IsString, IsEmail, IsOptional } from 'class-validator';

//회원가입
export class LoginReqDto {
  /**
   * 이메일
   *
   * @type {string}
   * @example ain0103@naver.com
   */
  @IsEmail()
  @IsOptional()
  email: string;

  /**
   *카카오 회원 아이디
   * @type {string}
   * @example 0342
   *
   */
  @IsString()
  socialId: string;

  /**
   *
   *소셜로그인 종류
   * @type {string}
   * @example KAKAO
   */
  @IsString()
  provider: string;
}
