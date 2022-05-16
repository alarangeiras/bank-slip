import type { Config } from '@jest/types';
const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/infra/**/*.ts', '!<rootDir>/src/init/**/*.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
export default config;
