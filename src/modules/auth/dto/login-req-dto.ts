import { IsString, IsEmail, IsOptional } from 'class-validator';

//회원가입
export class LoginReqDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  socialId: string;

  @IsString()
  provider: string;
}
