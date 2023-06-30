import { SignalRepository } from 'src/repositories';
import { signalDataObject } from '../data/signal.data.mock';
import { MockRepository } from './mock.repository';

export const MockSignalRepository = (): MockRepository<SignalRepository> => ({
  save: jest.fn(),
  getList: jest.fn().mockResolvedValue(signalDataObject[0]),
});
