
var base = require('../lib/base'),
    atom = require('../lib/atom'),
    fact = require('../lib/fact'),
    assert = require('assert');
    
// base as a function

assert.ok(base);
assert.equal(typeof base, 'function');

// query an empty base

var base1 = base();
assert.equal(base1.query(fact(atom('a'))), false);

