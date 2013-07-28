
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

// fact with only functor

var result = fact(atom('a'));
assert.ok(result);
assert.ok(result.functor);
assert.equal(result.functor.asString(), 'a');
assert.equal(result.arity, 0);
assert.equal(result.asString(), 'a()');

// fact does not match integer, string, real, atom

var fact1 = fact(atom('a'), [1, atom('b')]);
assert.equal(fact1.match(1), false);
assert.equal(fact1.match("foo"), false);
assert.equal(fact1.match(1.2), false);
assert.equal(fact1.match(atom('a')), false);


