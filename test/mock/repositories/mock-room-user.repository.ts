import { RoomUserRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockRoomUserRepository = (): MockRepository<RoomUserRepository> => ({
  get: jest.fn(),
});
