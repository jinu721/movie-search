module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@di/(.*)$': '<rootDir>/src/di/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};
