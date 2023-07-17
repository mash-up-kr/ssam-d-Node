import { CrashRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockCrashRepository = (): MockRepository<CrashRepository> => ({
  save: jest.fn(),
});
