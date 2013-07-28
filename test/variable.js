
var variable = require('../lib/variable'),
    binding = require('../lib/binding'),
    atom = require('../lib/atom'),
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

// unbound variable match number

var varx = variable('X', 0);
assert.ok(varx);
assert.strictEqual(varx.offset, 0);
var bind = binding(1);
var atomx = atom('x');
assert.equal(varx.match(atomx, bind), true);

var result = bind.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

