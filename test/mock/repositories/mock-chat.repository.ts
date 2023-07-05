import { ChatRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockChatRepository = (): MockRepository<ChatRepository> => ({});
