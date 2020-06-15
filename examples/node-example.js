/* eslint-disable no-console, no-plusplus */

// Import methods and version from array-correl from node_modules
// const { generate, inspect, version } = require('array-correl');

// Import methods and version from array-correl locally
const { generate, inspect, version } = require('../src/index.js');

console.log(`\narray-correl version: ${version}\n`);

const count = 10000;
const targetCorrelation = 0.8;
const mean = 100;
const deviation = 1;

// Create an array with values of correlated pairs of numbers
const array = generate(count, targetCorrelation, mean, deviation);

// Log the first 10 array elements
for (let i = 0; i < 10; i++) {
  console.log(array[i]);
}

// Inspect the array
const result = inspect(array);
console.log(`\nResult: \n${JSON.stringify(result, null, 2)}\n`);

/*
Example output:
  array-correl version: 1.0.0

  { x: 100.90542128472944, y: 101.16301520124289 }
  { x: 100.8375594995795, y: 100.78118327320668 }
  { x: 99.0584892954525, y: 99.29959979102193 }
  { x: 100.0302815165003, y: 99.73897935173298 }
  { x: 99.44774730498348, y: 99.5411475690568 }
  { x: 98.70326793750856, y: 99.3244951632425 }
  { x: 100.81721645911148, y: 100.9643422642515 }
  { x: 99.86574697178696, y: 100.88272192340173 }
  { x: 100.66509593763725, y: 101.36878942279517 }
  { x: 101.59064605388265, y: 102.47436305887085 }

  Result:
  {
    "r": 0.8017933981205159,
    "xDeviation": 1.0073267792537017,
    "yDeviation": 1.0078778005901512,
    "xExtent": [
      96.3746116861159,
      103.55984664129222
    ],
    "yExtent": [
      96.23648748829099,
      103.74616434718043
    ],
    "xMean": 99.99641594203113,
    "yMean": 100.00007466867294
  }
*/
