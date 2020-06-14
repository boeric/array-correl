/* eslint-disable no-console */
/* global assert, before, describe, expect, it */

const { generate, inspect } = require('../src/index.js');

describe('Generate', () => {
  describe('Test 0', () => {
    const count = 10;
    const correlation = 0.999999;
    const mean = 10;
    const deviation = 1; //0.0000001 //1;

    let result;

    before(() => {
      result = generate(count, correlation, mean, deviation);
    });

    it('should x', () => {
      console.log('result', result);
      console.log('inspect', inspect(result))
      expect(true === true);
    });
  });
});
