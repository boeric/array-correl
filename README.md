## array-correl

###Installation

`npm install array-correl`

### Generate

array-correl.**generate**(count, [correlation, [mean, [deviation]]])

The **generate** method generates an array of length **count** with correlated sets of numbers in the `{ x: xValue, y: yValue }` format. Optionally, the following parameters can be specified:

- Target **correlation** coefficient ranging from 0 to 1,
- Target **mean**,
- Target **deviation**

If the correlation coefficient is not specified, it defaults to 0.7; if mean is not specified, it defaults to 0; if deviation is not specified, it defaults to 1.

#### Generate Errors

If no **count** argument is passed, a **ReferenceError** is thrown. If any passed argument is **not a number** (or cannot be coerced to a number), a **TypeError** is thrown.

### Inspect

array-correl.**inspect**(array)

The **inspect** method analyzes the supplied array and returns several statistics measures. The format of the input array must be one of the following:

- Each array element contains an object with the following properties: `{ x: xValue, y: yValue }`
- Each array element contains a two-element array of the following structure: `[ xValue, yValue ]`

The function returns the following parameters in a JS object:

- The Pearson correlation coefficient of the x and y data series
- The deviation of each of the the x and y data series
- The mean of each of the x and y data series
- The extent (min and max) of each of the x and y data series

#### Inspect Errors

If no **array** argument is passed, a **ReferenceError** is thrown. If the passed array doesn't contain either two-element arrays or objects with x and y properties, a **TypeError** is thrown.

Example:
```
// Import methods and version from array-correl from node_modules
const { generate, inspect, version } = require('array-correl');

// Import methods and version from array-correl locally
// const { generate, inspect, version } = require('../src/index.js');

// Log version
console.log(`array-correl version: ${version}`);

// Define inputs to the generate method
const count = 10000;
const correlation = 0.8;
const mean = 100;
const deviation = 1;

// Log inputs
console.log('\nInputs to generate:');
console.log(`  count: ${count}`);
console.log(`  correlation: ${correlation}`);
console.log(`  mean: ${mean}`);
console.log(`  deviation: ${deviation}`);

// Create an array with values of correlated pairs of numbers
const array = generate(count, correlation, mean, deviation);

console.log('\nFirst 10 correlated pairs:');
// Log the first 10 array elements
for (let i = 0; i < 10; i++) {
  console.log(`  ${JSON.stringify(array[i])}`);
}

// Inspect the array
const result = inspect(array);
console.log(`\nOutput of inspect: \n${JSON.stringify(result, null, 2)}\n`);

/*
Example output:
  array-correl version: 1.0.0

  Inputs to generate:
    count: 10000
    correlation: 0.8
    mean: 100
    deviation: 1

  First 10 correlated pairs:
    {"x":99.71068933565104,"y":99.86127640311815}
    {"x":100.83597240809056,"y":100.074669667149}
    {"x":102.0130498785201,"y":101.38201755974566}
    {"x":100.65061261210614,"y":99.88629765791357}
    {"x":98.30631250480867,"y":98.49421518032264}
    {"x":99.48427439034523,"y":99.81419151256067}
    {"x":98.90338120221003,"y":98.38761587336445}
    {"x":101.06519781042032,"y":101.50229105410696}
    {"x":98.7248721438115,"y":98.06148966509333}
    {"x":99.40834127473076,"y":98.90308575665651}

  Output of inspect:
  {
    "r": 0.802558017048035,
    "xDeviation": 1.0004768422899535,
    "yDeviation": 0.9984232776109369,
    "xExtent": [
      95.99318668690016,
      103.92406651194449
    ],
    "yExtent": [
      96.15152222172428,
      103.84111296300848
    ],
    "xMean": 100.00871360178544,
    "yMean": 100.00635903137874
  }
*/
```
