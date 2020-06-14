/* eslint-disable camelcase, func-names, no-console, no-multi-spaces, no-param-reassign,
  no-plusplus, wrap-iife */

/* eslint-disable max-len */
/**
 * array-correl
 * Version: 0.1.1
 * Purpose: Generates array with desired correlation coefficient or computes correlation
 *   coefficient between two arrays
 * Sources and inspiration:
 *   http://memory.psych.mun.ca/tech/js/correlation.shtml
 *   http://stevegardner.net/2012/06/11/javascript-code-to-calculate-the-pearson-correlation-coefficient/
 *   http://hongqinlab.blogspot.com/2013/11/how-to-generated-correlated-random.html
 * By Bo Ericsson
 */
/* eslint-enable max-len */

const d3 = require('d3');


(function (exports) {
  const version = '0.1.1';

  // Compute correlation coefficient
  function getPearsonCorrelation(x, y) {
    let shortestArrayLength = 0;

    if (x.length === y.length) {
      shortestArrayLength = x.length;
    } else if (x.length > y.length) {
      shortestArrayLength = y.length;
      const ignored = x.length - shortestArrayLength;
      console.error(`x has more items than y, the last ${ignored} item(s) will be ignored`);
    } else {
      shortestArrayLength = x.length;
      const ignored = x.length - shortestArrayLength;
      console.error(`x has more items than y, the last ${ignored} item(s) will be ignored`);
    }

    const xy = [];
    const x2 = [];
    const y2 = [];

    for (let i = 0; i < shortestArrayLength; i++) {
      xy.push(x[i] * y[i]);
      x2.push(x[i] * x[i]);
      y2.push(y[i] * y[i]);
    }

    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_x2 = 0;
    let sum_y2 = 0;

    for (let i = 0; i < shortestArrayLength; i++) {
      sum_x += x[i];
      sum_y += y[i];
      sum_xy += xy[i];
      sum_x2 += x2[i];
      sum_y2 += y2[i];
    }

    const step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    const step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    const step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    const step4 = Math.sqrt(step2 * step3);
    const answer = step1 / step4;

    return answer;
  }

  // Generate data distribution that conforms to the input specification
  function generate(count, correlation, mean, deviation) {
    // Validate arguments
    if (!count) { throw new ReferenceError('Missing count argument'); }
    [
      { name: 'count',       param: count },
      { name: 'correlation', param: correlation },
      { name: 'mean',        param: mean },
      { name: 'deviation',   param: deviation },
    ].forEach((d) => {
      if (d.param !== undefined) {
        if (Number.isNaN(parseFloat(d.param)) || !Number.isFinite(d.param)) {
          throw new TypeError(`Invalid ${d.name} argument`);
        }
      }
    });

    // Initialize variables
    const r = correlation || 0.7;
    const m = mean || 0;
    const d = deviation || 1;
    const nD = d3.random.normal(m, d);
    const data = [];

    // Generate correlated numbers
    d3.range(count).forEach(() => {
      const x1 = nD();
      const x2 = nD();
      const y1 = r * x1 + Math.sqrt(1 - r * r) * x2;

      data.push({ x: x1, y: y1 });
    });

    // Return result
    return data;
  }

  // Analyze the passed array
  function inspect(input) {
    // Validate argument
    if (!Array.isArray(input)) {
      throw new ReferenceError('Missing input array argument');
    } else if (Array.isArray(input[0]) && input[0].length !== 2) {
      throw new TypeError('Array length is not 2 at index 0 of input array');
    } else if (!Array.isArray() && !('x' in input[0] && 'y' in input[0])) {
      throw new TypeError('No x or y property at object at index 0 of input array');
    }

    // Get local copy of array
    let data = input.slice();

    // If input is in array-in-array format (not object-in-array), convert to object-in-array
    if (Array.isArray(input[0]) && data[0].length === 2) {
      data = [];
      for (let i = 0; i < input.length; i++) {
        data.push({
          x: input[i][0],
          y: input[i][1],
        });
      }
    }

    // Create x and y arrays
    const x = [];
    const y = [];
    data.forEach((d) => {
      x.push(d.x);
      y.push(d.y);
    });

    return {
      r: getPearsonCorrelation(x, y),
      xDeviation: d3.deviation(data, (d) => d.x),
      yDeviation: d3.deviation(data, (d) => d.y),
      xMean: d3.mean(data, (d) => d.x),
      yMean: d3.mean(data, (d) => d.y),
      xExtent: d3.extent(data, (d) => d.x),
      yExtent: d3.extent(data, (d) => d.y),
    };
  }

  // Exports
  exports.generate = (count, corr, mean, dev) => generate(count, corr, mean, dev);
  exports.inspect = (input) => inspect(input);
  exports.version = version;
})(typeof exports === 'undefined' ? this.correl = {} : exports);

/*
module.exports = {
  // Generate data distribution that conforms to the input specification
  generate: (count, correlation, mean, deviation) => {
    // Validate arguments
    if (!count) { throw new ReferenceError('Missing count argument'); }
    [
      { name: 'count',       param: count },
      { name: 'correlation', param: correlation },
      { name: 'mean',        param: mean },
      { name: 'deviation',   param: deviation },
    ].forEach((d) => {
      if (d.param !== undefined) {
        if (Number.isNaN(parseFloat(d.param)) || !Number.isFinite(d.param)) {
          throw new TypeError(`Invalid ${d.name} argument`);
        }
      }
    });

    // Initialize variables
    const r = correlation || 0.7;
    const m = mean || 0;
    const d = deviation || 1;
    const nD = d3.random.normal(m, d);
    const data = [];

    // Generate correlated numbers

    d3.range(count).forEach(() => {
      const x1 = nD();
      const x2 = nD();
      const y1 = r * x1 + Math.sqrt(1 - r * r) * x2;

      data.push({ x: x1, y: y1 });
    });

    // Return result
    return data;
  },

  // Analyze the passed array
  inspect: (input) => {
    // Validate argument
    if (!Array.isArray(input)) {
      throw new ReferenceError('Missing input array argument');
    } else if (Array.isArray(input[0]) && input[0].length !== 2) {
      throw new TypeError('Array length is not 2 at index 0 of input array');
    } else if (!Array.isArray() && !('x' in input[0] && 'y' in input[0])) {
      throw new TypeError('No x or y property at object at index 0 of input array');
    }

    // Get local copy of array
    let data = input.slice();

    // If input is in array-in-array format (not object-in-array), convert to object-in-array
    if (Array.isArray(input[0]) && data[0].length === 2) {
      data = [];
      for (let i = 0; i < input.length; i++) {
        data.push({
          x: input[i][0],
          y: input[i][1],
        });
      }
    }

    // Create x and y arrays
    const x = [];
    const y = [];
    data.forEach((d) => {
      x.push(d.x);
      y.push(d.y);
    });

    return {
      r: getPearsonCorrelation(x, y),
      xDeviation: d3.deviation(data, (d) => d.x),
      yDeviation: d3.deviation(data, (d) => d.y),
      xMean: d3.mean(data, (d) => d.x),
      yMean: d3.mean(data, (d) => d.y),
      xExtent: d3.extent(data, (d) => d.x),
      yExtent: d3.extent(data, (d) => d.y),
    };
  },
};
*/
