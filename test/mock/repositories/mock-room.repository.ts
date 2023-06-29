import {ChatRepository, RoomRepository, SignalRepository} from 'src/repositories';
import { signalDataObject } from '../data/signal.data.mock';
import { MockRepository } from './mock.repository';

export const MockRoomRepository = (): MockRepository<RoomRepository> => ({
});
