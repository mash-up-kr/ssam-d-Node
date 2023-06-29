import {ChatRepository, SignalRepository} from 'src/repositories';
import { signalDataObject } from '../data/signal.data.mock';
import { MockRepository } from './mock.repository';

export const MockChatRepository = (): MockRepository<ChatRepository> => ({
});
