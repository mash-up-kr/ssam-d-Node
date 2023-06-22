export class DeviceToken {
  private readonly _id: number;
  private readonly _value: string;
  private readonly _userId: number;

  constructor(deviceToken) {
    this._id = deviceToken.id;
    this._value = deviceToken.deviceToken;
    this._userId = deviceToken.userId;
  }

  get id(): number {
    return this._id;
  }
  get deviceToken(): string {
    return this._value;
  }

  get userId(): number {
    return this._userId;
  }
}
