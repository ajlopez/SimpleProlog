
var fact = require('../lib/fact'),
    atom = require('../lib/atom'),
    variable = require('../lib/variable'),
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

// fact match similar fact

var fact1b = fact(atom('a'), [1, atom('b')]);
assert.equal(fact1.match(fact1b), true);
assert.equal(fact1b.match(fact1), true);

// fact does not match not similar fact

var fact2 = fact(atom('a'), [2, atom('b')]);
var fact3 = fact(atom('a'), [1, atom('c')]);
var fact4 = fact(atom('c'), [1, atom('b')]);
var fact5 = fact(atom('a'), [1, atom('b'), 3]);

assert.equal(fact1.match(fact2), false);
assert.equal(fact1.match(fact3), false);
assert.equal(fact1.match(fact4), false);
assert.equal(fact1.match(fact5), false);

// fact has nvariables, nanonymous == 0

var fact1 = fact(atom('a'), [2, atom('b')]);
assert.equal(fact1.nvariables, 0);
assert.equal(fact1.nanonymous, 0);
assert.equal(fact.variables, null);

// fact with one variable

var fact1 = fact(atom('a'), [2, variable('X')]);
assert.equal(fact1.nvariables, 1);
assert.equal(fact1.nanonymous, 0);
assert.ok(fact1.variables);
assert.equal(fact1.variables.length, 1);
assert.equal(fact1.variables[0], 'X');

