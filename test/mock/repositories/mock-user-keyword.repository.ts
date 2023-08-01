import { UserKeywordRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockUserKeywordRepository = (): MockRepository<UserKeywordRepository> => ({
  getUnregisterdKeywords: jest.fn(),
  getSubscribingKeywords: jest.fn(),
});
