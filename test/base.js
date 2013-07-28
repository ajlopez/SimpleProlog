
var base = require('../lib/base'),
    atom = require('../lib/atom'),
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

