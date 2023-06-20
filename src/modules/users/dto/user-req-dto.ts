import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';

//회원가입
export class UserReqDto {
  /**
   * 닉네임
   * @example 쌈디
   */
  @IsString()
  nickname: string;

  @IsEmail()
  email: string;
}

export class UserNicknameReqDto extends PickType(UserReqDto, ['nickname']) {}
