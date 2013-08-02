
var atom = require('../lib/atom'),
    binding = require('../lib/binding'),
    variable = require('../lib/variable'),
    assert = require('assert');
    
// atom as a function

assert.ok(atom);
assert.equal(typeof atom, 'function');

// create atom with name

var atomfoo = atom('foo');
assert.ok(atomfoo);
assert.equal(atomfoo.name, 'foo');
assert.equal(atomfoo.asString(), 'foo');

// match atom with same name

var atomfoo2 = atom('foo');
assert.ok(atomfoo.match(atomfoo2));

// no match atom with other name

var atombar = atom('bar');
assert.ok(!atomfoo.match(atombar));

// no match with number

assert.ok(!atomfoo.match(42));

// no match with string

assert.ok(!atomfoo.match("foo"));

// no match with null

assert.ok(!atomfoo.match(null));

// no match with undefined

assert.ok(!atomfoo.match(null));

// no match with false

assert.ok(!atomfoo.match(false));

// no match with true

assert.ok(!atomfoo.match(true));

// match with variable

var bindings = binding(1);
var varx = variable('X');
varx.offset = 0;
assert.ok(atomfoo.match(varx, bindings));
var value = bindings.get(0);
assert.ok(value);
assert.equal(value.name, 'foo');
