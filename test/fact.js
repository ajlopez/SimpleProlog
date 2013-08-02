
var fact = require('../lib/fact'),
    atom = require('../lib/atom'),
    variable = require('../lib/variable'),
    binding = require('../lib/binding'),
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

// fact with two variable

var fact1 = fact(atom('a'), [variable('Y'), variable('X')]);
assert.equal(fact1.nvariables, 2);
assert.equal(fact1.nanonymous, 0);
assert.ok(fact1.variables);
assert.equal(fact1.variables.length, 2);
assert.equal(fact1.variables[0], 'Y');
assert.equal(fact1.variables[1], 'X');

// fact with functor variable

var fact1 = fact(variable('Z'), [variable('Y'), variable('X')]);
assert.equal(fact1.nvariables, 3);
assert.equal(fact1.nanonymous, 0);
assert.ok(fact1.variables);
assert.equal(fact1.variables.length, 3);
assert.equal(fact1.variables[0], 'Z');
assert.equal(fact1.variables[1], 'Y');
assert.equal(fact1.variables[2], 'X');

// fact with repeated variable

var fact1 = fact(atom('a'), [variable('X'), variable('X')]);
assert.equal(fact1.nvariables, 1);
assert.equal(fact1.nanonymous, 0);
assert.ok(fact1.variables);
assert.equal(fact1.variables.length, 1);
assert.equal(fact1.variables[0], 'X');

// fact with items as arguments in constructor

var fact1 = fact(atom('a'), 1, 2, 3);
assert.equal(fact1.asString(), "a(1, 2, 3)");
var fact2 = fact(atom('b'), variable('X'), atom('a'), 3);
assert.equal(fact2.asString(), "b(X, a, 3)");

// fact with facts with variables

var fact1 = fact(atom('a'), fact(atom('b'), variable('X')), fact(atom('c'), variable('Y')), fact(atom('d'), variable('X')));
assert.equal(fact1.nvariables, 2);
assert.equal(fact1.nanonymous, 0);
assert.ok(fact1.variables);
assert.equal(fact1.variables.length, 2);
assert.equal(fact1.variables[0], 'X');
assert.equal(fact1.variables[1], 'Y');

// variables annotated with offset in a fact

var variablex = variable('X');
var variablex2 = variable('X');
var variabley = variable('Y');
var fact1 = fact(atom('a'), fact(atom('b'), variablex), fact(atom('c'), variabley), fact(atom('d'), variablex2));

assert.equal(variablex.offset, 0);
assert.equal(variabley.offset, 1);
assert.equal(variablex2.offset, 0);

// anonymous variables counted and annotated with offset

var anon1 = variable('_');
var anon2 = variable('_');
var anon3 = variable('_');
var fact1 = fact(atom('a'), fact(atom('b'), anon1), fact(atom('c'), anon2), fact(atom('d'), anon3));

assert.equal(fact1.nvariables, 0);
assert.equal(fact1.nanonymous, 3);
assert.equal(anon1.offset, 0);
assert.equal(anon2.offset, 1);
assert.equal(anon3.offset, 2);

// fact with variable match fact with atom

var fact1 = fact(atom('a'), [1, atom('b')]);
var fact1x = fact(atom('a'), [1, variable('X')]);
var bind = binding(1);
var result = fact1x.match(fact1, bind);
assert.ok(result);
var value = bind.get(0);
assert.ok(value);
assert.equal(value.name, 'b');

