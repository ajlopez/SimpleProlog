
var variable = require('../lib/variable'),
    assert = require('assert');
    
// variable as function

assert.ok(variable);
assert.equal(typeof variable, 'function');

// create variable

var result = variable('X');
assert.ok(result);
assert.equal(result.name, 'X');
assert.equal(result.asString(), 'X');
assert.equal(result.variable, true);
assert.equal(result.offset, undefined);

// create variable with offset

var result = variable('X', 10);
assert.ok(result);
assert.equal(result.name, 'X');
assert.equal(result.asString(), 'X');
assert.equal(result.variable, true);
assert.equal(result.offset, 10);

