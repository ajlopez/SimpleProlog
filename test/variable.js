
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
var bind = binding(1);
var atomx = atom('x');
assert.equal(varx.match(atomx, bind), true);

var result = bind.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

// bound variable does not match other atom

var atomy = atom('y');
assert.equal(varx.match(atomy, bind), false);

var result = bind.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

// bound variable match atom with same name

var atomx2 = atom('x');
assert.equal(varx.match(atomx2, bind), true);

var result = bind.get(0);
assert.ok(result);
assert.strictEqual(result, atomx);

// unbound variables match

var varx = variable('X', 0);
var vary = variable('Y', 1);
var bind = binding(2);
assert.equal(varx.match(vary, bind), true);
assert.strictEqual(bind.get(1), varx);
assert.equal(bind.get(0), null);

// unbound variables match, inverse order

var varx = variable('X', 0);
var vary = variable('Y', 1);
var bind = binding(2);
assert.equal(vary.match(varx, bind), true);
assert.strictEqual(bind.get(1), varx);
assert.equal(bind.get(0), null);


