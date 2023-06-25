import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/domains/user';

export class UserResDto {
  /**
   *
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly id: number;
  /**
   *
   * @readonly
   * @type {string}
   * @example 닉네임
   */
  readonly nickname: string;
  /**
   *
   * @readonly
   * @type {string}
   * @example email@email.com
   */
  readonly email: string;
  /**
   *
   * @readonly
   * @type {string}
   * @example KAKAO
   */
  readonly provider: string;
  /**
   *
   * @readonly
   * @type {string}
   * @example
   * https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png
   */
  readonly profileImageUrl: string;
  /**
   *
   * @readonly
   * @type {Boolean}
   * @example true
   */
  readonly agreeAlarm: boolean;

  constructor({ id, nickname, email, provider, profileImageUrl, agreeAlarm }: Partial<User>) {
    this.id = id;
    this.nickname = nickname;
    this.email = email;
    this.provider = provider;
    this.profileImageUrl = profileImageUrl;
    this.agreeAlarm = agreeAlarm;
  }
}
