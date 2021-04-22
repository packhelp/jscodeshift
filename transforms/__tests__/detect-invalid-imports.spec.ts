import { defineTest } from 'jscodeshift/src/testUtils';

// IMPORTANT:
// Nesting "it" in "describe" is forbidden

describe("detect-invalid-imports", () => {
  defineTest(__dirname, './detect-invalid-imports', null, 'detect-invalid-imports/basic', { parser: 'ts' });
});
