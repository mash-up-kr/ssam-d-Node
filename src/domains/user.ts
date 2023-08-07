export class User {
  readonly id: number;
  readonly nickname: string;
  readonly email: string;
  readonly refreshToken?: string;
  readonly socialId: string;
  readonly provider: string;
  readonly profileImageUrl: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly agreeAlarm: boolean;
  readonly deletedAt: Date;

  constructor(user) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.email = user.email;
    this.refreshToken = user.refreshToken;
    this.socialId = user.socialId;
    this.provider = user.provider;
    this.profileImageUrl = user.profileImageUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.agreeAlarm = user.agreeAlarm;
    this.deletedAt = user.deletedAt;
  }
}
