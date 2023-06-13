import { IsString, IsEmail } from 'class-validator';

//회원가입
export class LoginReqDto {
  @IsString()
  nickname: string;
  @IsEmail()
  email: string;
  @IsString()
  socialId: string;
  @IsString()
  provider: string;
}
