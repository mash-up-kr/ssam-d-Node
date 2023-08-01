import { UserResDto } from 'src/modules/users/dto/user-res-dto';

export class LoginResDto {
  /**
   *
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly userId: number;
  /**
   * access token
   *
   * @readonly
   * @type {string}
   * @example
   * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg2MjIzMTIzLCJleHAiOjE2ODYyMjQ5MjN9.eCptUJN3aAFwlOz3TFw6JJZL4A9e5NGSyEJFx4b4Ovw
   */
  readonly accessToken: string;

  /**
   * refresh token
   *
   * @readonly
   * @type {string}
   * @example
   * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg2MjIzMTIzLCJleHAiOjE2ODYyMjQ5MjN9.eCptUJN3aAFwlOz3TFw6JJZL4A9e5NGSyEJFx4b4Ovw
   */
  readonly refreshToken: string;

  readonly user: UserResDto | null;

  readonly keywords: string[];

  constructor({ userId, accessToken, refreshToken, user, keywords }) {
    this.userId = userId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = new UserResDto(user);
    this.keywords = keywords;
  }
}
