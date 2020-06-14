/* eslint-disable no-console */
/* global assert, before, describe, expect, it */

const { generate, inspect } = require('../src/index.js');

function approximatelyEqual(value, expected, tolerance) {
  console.log(value, expected, expected - tolerance, expected + tolerance);
  return false
  return (value >= (expected - tolerance)) && (value <= (expected + tolerance));
}

describe('Generate', () => {
  describe('Test absolute correlation, no deviation', () => {
    const count = 100;
    const correlation = 1;
    const mean = 100;
    const deviation = Number.MIN_VALUE;
    let result;

    // Generate array with correlated pairs
    before(() => {
      result = generate(count, correlation, mean, deviation);
    });

    it('should generate values with no distribution', () => {
      // Inspect the result
      const {
        xDeviation,
        yDeviation,
        xExtent,
        yExtent,
        xMean,
        yMean,
      } = inspect(result);

      it('should generate an array of specified size', () => {
        assert.deepEqual(result.length, count);
      });

      it('should produce deviation of 0', () => {
        expect(xDeviation).equal(0);
        expect(yDeviation).equal(0);
      });

      it('should produce constant min/max', () => {
        expect(xExtent[0]).equal(mean);
        expect(xExtent[1]).equal(mean);
        expect(yExtent[0]).equal(mean);
        expect(yExtent[1]).equal(mean);
      });

      it('should produce constant mean', () => {
        expect(xMean).equal(mean);
        expect(yMean).equal(mean);
      });
    });
  });

  describe('Test correlation 0.7, mean 100, deviation 1', () => {
    const count = 10000;
    const correlation = 0.7;
    const mean = 100;
    const deviation = 1;
    let result;

    before(() => {
      result = generate(count, correlation, mean, deviation);
    });

    it('should generate correlated pairs approximately conforming to spec', () => {
      // Inspect the result
      const {
        r,
        // xDeviation,
        // yDeviation,
        // xExtent,
        // yExtent,
        // xMean,
        // yMean,
      } = inspect(result);
      // console.log(inspect(result));

      console.log(approximatelyEqual(r, correlation, 0.000000001));

      it('should generate an array of specified size', () => {
        assert.deepEqual(result.length, count);
      });

      it('should produce correct pearson correlation coefficient approximation', () => {
        assert.deepEqual(true, approximatelyEqual(r, correlation, 0.01));
      });

      /*
      it('should produce correct deviation approximation', () => {
        //assert(approximatelyEqual(xDeviation, deviation, 0.00000001));
        //expect(approximatelyEqual(yDeviation, deviation, 0.01));
      });

      it('should produce correct min/max approximation', () => {
        // expect(xExtent[0]).equal(mean);
        // expect(xExtent[1]).equal(mean);
        // expect(yExtent[0]).equal(mean);
        // expect(yExtent[1]).equal(mean);
      });

      it('should produce correct mean approximation', () => {
        // expect(xMean).equal(mean);
        // expect(yMean).equal(mean);
      });
      */
    });
  });
});
