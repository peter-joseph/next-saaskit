/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageThreshold: {
    "branches": 50,
    "functions": 100,
    "lines": 100,
    "statements": 100
  }
};
