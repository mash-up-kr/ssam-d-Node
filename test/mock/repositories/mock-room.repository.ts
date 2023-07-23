import { RoomRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockRoomRepository = (): MockRepository<RoomRepository> => ({ get: jest.fn(), update: jest.fn() });
