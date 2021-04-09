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
