//개발하면서 역할이 들어남
// 공통적인 코드 validation , 행동 , 함수 , 유효한 유저인지 검증, 유지보수하기 쉽게

export class User {
  private readonly _id: number;
  private readonly _nickname: string;
  private readonly _email: string;
  private readonly _refreshToken?: string;
  private readonly _socialId: string;
  private readonly _provider: string;
  private readonly _profileImageUrl: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _agreeAlarm: boolean;

  constructor(user) {
    this._id = user.id;
    this._nickname = user.nickname;
    this._email = user.email;
    this._refreshToken = user.refreshToken;
    this._socialId = user.socialId;
    this._provider = user.provider;
    this._profileImageUrl = user.profileImageUrl;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
    this._agreeAlarm = user.agreeAlarm;
  }

  get id(): number {
    return this._id;
  }
  get nickname(): string {
    return this._nickname;
  }
  get email(): string {
    return this._email;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }
  get socialId(): string {
    return this._socialId;
  }
  get provider(): string {
    return this._provider;
  }
  get profileImageUrl(): string {
    return this._profileImageUrl;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get agreeAlarm(): boolean {
    return this._agreeAlarm;
  }
}
