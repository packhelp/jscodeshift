import { defineTest } from 'jscodeshift/src/testUtils';

// IMPORTANT:
// Nesting "it" in "describe" is forbidden

describe("create-jest-tests", () => {
  defineTest(__dirname, './create-jest-tests', null, 'create-jest-tests/basic', { parser: 'ts' });
});
