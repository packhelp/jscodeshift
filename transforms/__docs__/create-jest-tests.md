### `create-jest-tests`

Creates Jest file with tests to code provided in input file.

#### Example

```js
// BEFORE:
import * as bloopy from 'mod1';

export const foo = () => 'fn-foo';
const bar = () => 'fn-bar';
export function baz() { return 'fn-baz'; }

const foobar1 = () => 'fn-foobar1';
const foobar2 = () => 'fn-foobar2';
const foobar3 = () => 'fn-foobar3';
const foobar4 = () => 'fn-foobar4';

export { bar }
export { foobar1 }
export { foobar2, foobar3 }
export default bar;

module.exports.foobar4 = foobar4;
module.exports.foobar5 = () => 'fn-foobar5';
exports.plainObject = 42;

module.exports = { wow: 5 };


// AFTER:
/* eslint-env jest */
'use strict';

// store required mocks here
let mocks = {};

// required modules
jest.mock('mod1');

describe('basic.input.ts tests', () => {
  beforeEach(() => {
    mocks = {};
    mocks.mod1 = require('mod1');
  });
  it('handles the bar() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.bar()).toMatchSnapshot();
  });
  it('handles the baz() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.baz()).toMatchSnapshot();
  });
  it('handles the default() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.default()).toMatchSnapshot();
  });
  it('handles the foo() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.foo()).toMatchSnapshot();
  });
  it('handles the foobar1() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.foobar1()).toMatchSnapshot();
  });
  it('handles the foobar2() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.foobar2()).toMatchSnapshot();
  });
  it('handles the foobar3() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.foobar3()).toMatchSnapshot();
  });
  it('handles the foobar4() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.foobar4()).toMatchSnapshot();
  });
  it('handles the foobar5() snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.foobar5()).toMatchSnapshot();
  });
  it('handles the plainObject snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.plainObject).toMatchSnapshot();
  });
  it('handles the wow snapshot', () => {
    const lib = require('../basic.input.ts');
    expect(lib.wow).toMatchSnapshot();
  });
});

```

#### How to run

> Replace ``<file_or_dirs_and_globs>`` with for example `./../packhelp/landing/**/*.ts`
```sh
yarn run jscodeshift \
  -t transforms/create-jest-tests \
  --extensions=ts \
  --parser=ts \
  --ignore-pattern=./../**/node_modules/** \
  <file_or_dirs_and_globs>
```

