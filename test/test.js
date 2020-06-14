/* eslint-disable no-console */
/* global assert, before, describe, expect, it */

const { generate, inspect } = require('../src/index.js');

function approximatelyEqual(value, expected, tolerance) {
  // console.log(value, expected, expected - tolerance, expected + tolerance);
  return (value >= (expected - tolerance)) && (value <= (expected + tolerance));
}

describe('Generate', () => {
  describe('Test absolute correlation, no deviation', () => {
    const count = 100;
    const correlation = 1;
    const mean = 100;
    const deviation = Number.MIN_VALUE;
    let result;
    let stats;

    // Generate array with correlated pairs
    before(() => {
      result = generate(count, correlation, mean, deviation);
      stats = inspect(result);
    });

    describe('Should generate values with no distribution', () => {
      it('should generate an array of specified size', () => {
        assert.deepEqual(result.length, count);
      });

      it('should produce deviation of 0', () => {
        const { xDeviation, yDeviation } = stats;
        expect(xDeviation).equal(0);
        expect(yDeviation).equal(0);
      });

      it('should produce constant min/max', () => {
        const { xExtent, yExtent } = stats;
        expect(xExtent[0]).equal(mean);
        expect(xExtent[1]).equal(mean);
        expect(yExtent[0]).equal(mean);
        expect(yExtent[1]).equal(mean);
      });

      it('should produce constant mean', () => {
        const { xMean, yMean } = stats;
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
    let stats;

    before(() => {
      result = generate(count, correlation, mean, deviation);
      stats = inspect(result);
    });

    describe('Should generate correlated pairs approximately conforming to spec', () => {
      it('should generate an array of specified size', () => {
        assert.deepEqual(result.length, count);
      });

      it('should produce correct pearson correlation coefficient approximation', () => {
        const { r } = stats;
        assert.deepEqual(true, approximatelyEqual(r, correlation, 0.01));
      });

      it('should produce correct deviation approximation', () => {
        const { xDeviation, yDeviation } = stats;
        assert.deepEqual(true, approximatelyEqual(xDeviation, deviation, 0.02));
        assert.deepEqual(true, approximatelyEqual(yDeviation, deviation, 0.02));
      });

      it('should produce correct min/max approximation', () => {
        const { xExtent, yExtent } = stats;
        assert.deepEqual(true, approximatelyEqual(xExtent[0], mean, 6));
        assert.deepEqual(true, approximatelyEqual(xExtent[1], mean, 6));
        assert.deepEqual(true, approximatelyEqual(yExtent[0], mean, 6));
        assert.deepEqual(true, approximatelyEqual(yExtent[1], mean, 6));
      });

      it('should produce correct mean approximation', () => {
        const { xMean, yMean } = stats;
        assert.deepEqual(true, approximatelyEqual(xMean, mean, 0.02));
        assert.deepEqual(true, approximatelyEqual(yMean, mean, 0.02));
      });
    });
  });
});
