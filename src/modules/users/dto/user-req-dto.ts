import { PickType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

//회원가입
export class UserReqDto {
  nickname: string;
  @IsEmail()
  email: string;
  provider: string;
}

//export class UserNameReqDto extends PickType(UserReqDto, ['email']) {}
