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

  /**
   *
   * @readonly
   * @example dfklaj3849
   */
  readonly deviceToken: string;

  constructor({ userId, accessToken, refreshToken, deviceToken }) {
    this.userId = userId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.deviceToken = deviceToken;
  }
}
