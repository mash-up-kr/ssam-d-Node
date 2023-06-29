import { SignalRepository } from 'src/repositories';
import { signalDataObject } from '../data/signal.data.mock';
import { MockRepository } from './mock.repository';

export const MockSignalRepository = (): MockRepository<SignalRepository> => ({
  getList: jest.fn().mockResolvedValue(signalDataObject[0]),
});
