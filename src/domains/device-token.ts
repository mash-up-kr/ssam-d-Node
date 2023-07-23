export class DeviceToken {
  readonly id: number;
  readonly value: string;
  readonly userId: number;

  constructor(deviceToken) {
    this.id = deviceToken.id;
    this.value = deviceToken.deviceToken;
    this.userId = deviceToken.userId;
  }
}
