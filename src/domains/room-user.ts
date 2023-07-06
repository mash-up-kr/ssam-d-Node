export class RoomUser {
  readonly userId: number;
  readonly roomId: number;

  constructor(roomUser: Partial<RoomUser>) {
    this.userId = roomUser.userId;
    this.roomId = roomUser.roomId;
  }
}
