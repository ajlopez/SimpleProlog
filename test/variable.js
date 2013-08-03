
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

// unbound variable match atom

var varx = variable('X', 0);
assert.ok(varx);
assert.strictEqual(varx.offset, 0);
var bindings = binding(1);
var atomx = atom('x');
assert.equal(varx.match(atomx, bindings), true);

var result = bindings.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

// bound variable does not match other atom

var atomy = atom('y');
assert.equal(varx.match(atomy, bindings), false);

var result = bindings.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

// bound variable match atom with same name

var atomx2 = atom('x');
assert.equal(varx.match(atomx2, bindings), true);

var result = bindings.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

// unbound variables match

var varx = variable('X', 0);
var vary = variable('Y', 1);
var bindings = binding(2);
assert.equal(varx.match(vary, bindings), true);
assert.strictEqual(bindings.get(1), varx);
assert.equal(bindings.get(0), null);

// unbound variables match, inverse order

var varx = variable('X', 0);
var vary = variable('Y', 1);
var bindings = binding(2);
assert.equal(vary.match(varx, bindings), true);
assert.strictEqual(bindings.get(1), varx);
assert.equal(bindings.get(0), null);

// variable matches same offset variable

var varx = variable('X', 0);
var varx2 = variable('X', 0);
assert.equal(varx.match(varx2), true);

// bound variable to atom matches variable

var varx = variable('X', 0);
var vary = variable('Y', 1);
var atoma = atom('a');

var bindings = binding(2);
bindings.set(0, atoma);

assert.equal(varx.match(vary, bindings), true);
assert.strictEqual(bindings.get(1), atoma);
assert.strictEqual(bindings.get(0), atoma);

// bound variable to integer matches variable

var varx = variable('X', 0);
var vary = variable('Y', 1);

var bindings = binding(2);
bindings.set(0, 3);

assert.equal(varx.match(vary, bindings), true);
assert.strictEqual(bindings.get(1), 3);
assert.strictEqual(bindings.get(0), 3);

// bound variable to integer matches bound variable to same integer

var varx = variable('X', 0);
var vary = variable('Y', 1);

var bindings = binding(2);
bindings.set(0, 3);
bindings.set(1, 3);

assert.equal(varx.match(vary, bindings), true);
assert.strictEqual(bindings.get(1), 3);
assert.strictEqual(bindings.get(0), 3);

// bound variable to atom matches bound variable to same atom

var varx = variable('X', 0);
var vary = variable('Y', 1);
var atoma = atom('a');

var bindings = binding(2);
bindings.set(0, atoma);
bindings.set(1, atoma);

assert.equal(varx.match(vary, bindings), true);
assert.strictEqual(bindings.get(1), atoma);
assert.strictEqual(bindings.get(0), atoma);
