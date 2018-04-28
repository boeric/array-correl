"use strict";
/* eslint-disable no-console, no-redeclare */

/*
 * array-correl
 */

var d3 = require("d3");

module.exports = {
    generate: function(count, correlation, mean, deviation) {
        // Validate arguments
        if (!count) { throw new ReferenceError('Missing count argument'); }
        [   { name: "count",       param: count },
            { name: "correlation", param: correlation },
            { name: "mean",        param: mean },
            { name: "deviation",   param: deviation }
        ].forEach(function(d) {
            if (d.param != undefined) {
                if (isNaN(parseFloat(d.param)) || !isFinite(d.param)) {
                    throw new TypeError('Invalid ' + d.name + ' argument');
                }
            }
        });

        // Initialize variables
        var r = correlation || 0.7;
        var m = mean || 0;
        var d = deviation || 1;
        var nD = d3.random.normal(m, d);
        var data = [];

        // Generate correlated numbers
        // Source: http://www.sitmo.com/article/generating-correlated-random-numbers/
        d3.range(count).forEach(function(d) {
            var x1 = nD();
            var x2 = nD();
            var y1 = r * x1 + Math.sqrt(1 - r * r) * x2;

            data.push({ x: x1, y: y1 });
        });

        // Return result
        return data;
    },

    // Analyze the passed array
    inspect: function(input) {
        // Validate argument
        if (!Array.isArray(input)) {
            throw new ReferenceError('Missing input array argument');
        } else if (Array.isArray(input[0]) && input[0].length != 2) {
            throw new TypeError("Array length is not 2 at index 0 of input array");
        } else if (!Array.isArray() && !("x" in input[0] && "y" in input[0])) {
            throw new TypeError("No x or y property at object at index 0 of input array");
        }

        // Get local copy of array
        var data = input.slice();

        // If input is in array-in-array format (not object-in-array), convert to object-in-array
        if (Array.isArray(input[0]) && data[0].length == 2) {
            data = [];
            for (var i = 0; i < input.length; i++) {
                data.push({
                    x: input[i][0],
                    y: input[i][1]
                });
            }
        }

        // Create x and y arrays
        var x = [];
        var y = [];
        data.forEach(function(d) {
            x.push(d.x);
            y.push(d.y);
        });

        return {
            r: getPearsonCorrelation(x, y),

            xDeviation: d3.deviation(data, function(d) { return d.x; }),
            yDeviation: d3.deviation(data, function(d) { return d.y; }),

            xMean: d3.mean(data, function(d) { return d.x; }),
            yMean: d3.mean(data, function(d) { return d.y; }),

            xExtent: d3.extent(data, function(d) { return d.x; }),
            yExtent: d3.extent(data, function(d) { return d.y; })
        };
    }
};


// Compute correlation coefficient
// Source: http://memory.psych.mun.ca/tech/js/correlation.shtml
function getPearsonCorrelation(x, y) {
    var shortestArrayLength = 0;

    if (x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }

    var xy = [];
    var x2 = [];
    var y2 = [];

    for (var i = 0; i < shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }

    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;

    for (var i = 0; i < shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }

    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer = step1 / step4;

    return answer;
}
