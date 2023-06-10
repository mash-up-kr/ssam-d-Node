import { PickType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

//회원가입
export class LoginReqDto {
  nickname: string;
  @IsEmail()
  email: string;
  socialId: string;
  provider: string;
}

//export class UserNameReqDto extends PickType(UserReqDto, ['email']) {}
