export type MockRepository<T> = Partial<Record<keyof T, jest.Mock>>;
