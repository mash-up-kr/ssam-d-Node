export class LoginResDto {
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
   * @todo user 포함해서 반환
   */

  constructor({ accessToken, refreshToken }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
