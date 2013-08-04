
var base = require('../lib/base'),
    atom = require('../lib/atom'),
    variable = require('../lib/variable'),
    fact = require('../lib/fact'),
    assert = require('assert');
    
// base as a function

assert.ok(base);
assert.equal(typeof base, 'function');

// query an empty base

var base1 = base();
var fact1 = fact(atom('a'));
assert.equal(base1.query(fact1), false);

// assert and query

base1.assert(fact1);
assert.equal(base1.query(fact1), true);

// query unknown fact

var fact2 = fact(atom('b'), [1, 2]);
assert.equal(base1.query(fact2), false);

// query known fact with callback

var count = 0;
base1.query(fact1, function (err, bindings) {
    assert.ok(!err);
    assert.ok(bindings);
    count++;
});

assert.equal(count, 1);

// query known fact with repeated callback

var count = 0;

base1.query(fact1, function (err, bindings, next) {
    assert.ok(!err);
    if (count)
        assert.equal(bindings, false);
    else
        assert.ok(bindings);
        
    count++;
    
    if (bindings)
        next();
});

assert.equal(count, 2);

// query unknown fact with callback

var count = 0;
base1.query(fact2, function (err, bindings) {
    assert.ok(!err);
    assert.equal(bindings, false);
    count++;
});

assert.equal(count, 1);

// query using a variable

var base1 = base();
var fact1 = fact(atom('a'), atom('b'));
var fact2 = fact(atom('a'), atom('c'));
base1.assert(fact1);
base1.assert(fact2);

var factx = fact(atom('a'), variable('X'));

var result = base1.query(factx);

assert.ok(result);
assert.equal(typeof result, 'object');
assert.ok(result.X);
assert.equal(result.X.name, 'b');
