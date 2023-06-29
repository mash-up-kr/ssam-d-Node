import { TrashRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockTrashRepository = (): MockRepository<TrashRepository> => ({
  save: jest.fn(),
});
