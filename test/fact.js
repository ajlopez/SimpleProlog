
var fact = require('../lib/fact'),
    atom = require('../lib/atom'),
    assert = require('assert');
    
// fact as a function

assert.ok(fact);
assert.equal(typeof fact, 'function');

// fact with arguments

var result = fact(atom('a'), [1, 2]);
assert.ok(result);
assert.ok(result.functor);
assert.equal(result.functor.asString(), 'a');
assert.equal(result.arity, 2);
assert.equal(result.asString(), 'a(1, 2)');

// fact with atoms as arguments

var result = fact(atom('a'), [atom('b'), atom('c'), atom('d')]);
assert.ok(result);
assert.ok(result.functor);
assert.equal(result.functor.asString(), 'a');
assert.equal(result.arity, 3);
assert.equal(result.asString(), 'a(b, c, d)');

