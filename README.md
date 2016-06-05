##array-correl##

**Installation**

`npm install array-correl`

###Generate###

array-correl.**generate**(count, [correlation, [mean, [deviation]]])

The **generate** function generates an array of length **count** with correlated sets of numbers in the `{ x: xValue, y: yValue }` format. Optionally, the following parameters can be specified:

- Target **correlation** coefficient ranging from 0 to 1,
- Target **mean**,
- Target **deviation**

If the correlation coefficient is not specified, it defaults to 0.7; if mean is not specified, it defaults to 0; if deviation is not specified, it defaults to 1.

**Errors**

If no **count** argument is passed, a **ReferenceError** is thrown. If any passed argument is **not a number** (or cannot be coerced to a number), a **TypeError** is thrown.


###Inspect###

array-correl.**inspect**(array)

The **inspect** function analyzes the provided array and returns several statistics measures. The format of the input array must be one of the following:

- Each array element contains an object with the following properties: `{ x: xValue, y: yValue }`
- Each array element contains a two-element array of the following structure: `[ xValue, yValue ]`

The function returns the following parameters in a JS object:

- **Correlation** coefficient between the x and y data series
- **Deviation** of each of the the x and y data series
- **Mean** of each of the x and y data series
- **Extent** (min and max) of each of the x and y data series

**Errors**

If no **array** argument is passed, a **ReferenceError** is thrown. If the passed array doesn't contain either two-element arrays or objects with x and y properties, a **TypeError** is thrown.

**Example**

    var generate = require("array-correl").generate;
    var inspect = require("array-correl").inspect;

    var count = 1000;
    var correlation = 0.8; // target correlation coefficient

    // generate the array with correlated values
    var arr = generate(count, correlation);

    // log the first five values
    for (var i = 0; i < 5; i++) {
      console.log(arr[i]);
    }

    // inspect the array
    var result = inspect(arr);
    console.log("Result: " + JSON.stringify(result, null, 1));

    Example output:

    { x: -1.433433446852675, y: -1.2874856442743714 }
    { x: -0.4958016956327104, y: -0.6101114798632117 }
    { x: 0.9458344184643861, y: 0.798556821809681 }
    { x: -0.38554772543109844, y: 0.6127781800403045 }
    { x: -1.4927776106476227, y: -0.9662569398224352 }
    Result: {
     "r": 0.7885299658360504,
     "xDeviation": 0.9832074741934087,
     "yDeviation": 0.9877700948492263,
     "xMean": 0.024293319167541058,
     "yMean": 0.02359824473020299,
     "xExtent": [
      -2.7276999402505813,
      2.9319403480876676
     ],
     "yExtent": [
      -3.5539568480152726,
      3.142505814209396
     ]
    }


