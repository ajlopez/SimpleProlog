
var binding = require('../lib/binding'),
    assert = require('assert');
    
// binding as a function

assert.ok(binding);
assert.equal(typeof binding, 'function');

// create binding

var result = binding(2);
assert.ok(result);
assert.equal(result.current(), 2);
assert.equal(result.get(0), null);
assert.equal(result.get(1), null);

// strict null

assert.strictEqual(result.get(0), null);
assert.strictEqual(result.get(1), null);

// raise if invalid offset

assert.throws(
    function() {
        result.get(-1);
    },
    Error
);

assert.throws(
    function() {
        result.get(2);
    },
    Error
);

// set and get

result.set(0, 1);
result.set(1, "foo");

assert.equal(result.get(0), 1);
assert.equal(result.get(1), "foo");

