export class RoomUser {
  private readonly _userId: number;
  private readonly _roomId: number;

  constructor(roomUser: Partial<RoomUser>) {
    this._userId = roomUser.userId;
    this._roomId = roomUser.roomId;
  }

  get userId(): number {
    return this._userId;
  }

  get roomId(): number {
    return this._roomId;
  }
}
