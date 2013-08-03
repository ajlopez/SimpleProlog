
var binding = require('../lib/binding'),
    assert = require('assert');
    
// binding as a function

assert.ok(binding);
assert.equal(typeof binding, 'function');

// create binding

var result = binding(2);
assert.ok(result);
var current = result.current();
assert.ok(current);
assert.equal(typeof current, 'object');
assert.equal(current.size, 2);
assert.equal(current.nbindings, 0);
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

// raise if invalid offset in set

assert.throws(
    function() {
        result.set(-1, "foo");
    },
    Error
);

assert.throws(
    function() {
        result.set(2, "bar");
    },
    Error
);

// grows

result.grow(3);

var current = result.current();
assert.equal(current.size, 5);
assert.equal(result.get(0), 1);
assert.equal(result.get(1), "foo");
assert.strictEqual(result.get(2), null);
assert.strictEqual(result.get(3), null);
assert.strictEqual(result.get(4), null);

// reset

result.reset({ size: 3, nbindings: 2});

assert.equal(result.current().size, 3);
assert.equal(result.current().nbindings, 2);
assert.equal(result.get(0), 1);
assert.equal(result.get(1), "foo");
assert.strictEqual(result.get(2), null);

// raise if reset receives invalid size argument

assert.throws(
    function() {
        result.reset({ size: -1, nbindings: 0 });
    },
    Error
);

assert.throws(
    function() {
        result.reset({ size: 4, nbindings: 0 });
    },
    Error
);

// raise if reset receives invalid nbindings argument

assert.throws(
    function() {
        result.reset({ size: 0, nbindings: -1 });
    },
    Error
);

assert.throws(
    function() {
        result.reset({ size: 0, nbindings: 4 });
    },
    Error
);
