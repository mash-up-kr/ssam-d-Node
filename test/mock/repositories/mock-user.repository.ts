import { UserRepository } from 'src/repositories';
import { userDataObject } from '../data/user.data.mock';
import { MockRepository } from './mock.repository';

export const MockUserRepository = (): MockRepository<UserRepository> => ({
  get: jest.fn().mockResolvedValue(userDataObject[0]),
  delete: jest.fn().mockResolvedValue(null),
  save: jest.fn(),
  update: jest.fn(),
});
