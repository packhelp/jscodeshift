import { defineTest } from 'jscodeshift/src/testUtils';

// IMPORTANT:
// Nesting "it" in "describe" is forbidden

describe("use-root-store-to-use-store-migration", () => {
  defineTest(__dirname, './use-root-store-to-use-store-migration', null, 'use-root-store-to-use-store-migration/basic', { parser: 'ts' });
});
