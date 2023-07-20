export class RoomUser {
  readonly id: number;
  readonly userId: number;
  readonly roomId: number;

  constructor(roomUser: Partial<RoomUser>) {
    this.id = roomUser.id;
    this.userId = roomUser.userId;
    this.roomId = roomUser.roomId;
  }
}
