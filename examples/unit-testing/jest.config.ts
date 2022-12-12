import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  // setupFiles: ['dotenv/config'],
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  // Test File Settings
  modulePathIgnorePatterns: ['lib', 'dist'],
  testMatch: ['**/*.(unit|spec|test).(j|t)s'],

  // Code Coverage Settings
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',

    // Ignore Coverage For these Files
    '!src/test/**/*.ts',
  ],
  coverageReporters: ['html', 'json', 'text'],
  reporters: ['default'],
};

export default config;
