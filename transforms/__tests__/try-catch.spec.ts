import { defineTest } from 'jscodeshift/src/testUtils';

// IMPORTANT:
// Nesting "it" in "describe" is forbidden

describe("finding potential try catch missuses - reports missing throw", () => {
  defineTest(__dirname, './try-catch', null, 'try-catch/noThrow', { parser: 'ts' });
});

describe("finding potential try catch missuses - reports missing catch param", () => {
  defineTest(__dirname, './try-catch', null, 'try-catch/noCatchParam', { parser: 'ts' });
});

describe("finding potential try catch missuses - reports missing catch param", () => {
  defineTest(__dirname, './try-catch', null, 'try-catch/noCatchParamInThrow', { parser: 'ts' });
});
