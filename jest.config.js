module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['.module.ts', 'dist/'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
    'test/(.*)$': '<rootDir>/test/$1',
  },
};
