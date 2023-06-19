import { UserRepository } from 'src/repositories';
import { MockRepository } from './mock.repository';

export const MockUserRepository = (): MockRepository<UserRepository> => ({});
