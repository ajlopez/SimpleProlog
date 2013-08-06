
var structure = require('../lib/structure'),
    atom = require('../lib/atom'),
    variable = require('../lib/variable'),
    binding = require('../lib/binding'),
    assert = require('assert');
    
// structure as a function

assert.ok(structure);
assert.equal(typeof structure, 'function');

// structure with arguments

var result = structure(atom('a'), [1, 2]);
assert.ok(result);
assert.ok(result.functor);
assert.equal(result.functor.asString(), 'a');
assert.equal(result.arity, 2);
assert.equal(result.asString(), 'a(1, 2)');

// structure with atoms as arguments

var result = structure(atom('a'), [atom('b'), atom('c'), atom('d')]);
assert.ok(result);
assert.ok(result.functor);
assert.equal(result.functor.asString(), 'a');
assert.equal(result.arity, 3);
assert.equal(result.asString(), 'a(b, c, d)');

// structure with only functor

var result = structure(atom('a'));
assert.ok(result);
assert.ok(result.functor);
assert.equal(result.functor.asString(), 'a');
assert.equal(result.arity, 0);
assert.equal(result.asString(), 'a()');

// structure does not match integer, string, real, atom

var structure1 = structure(atom('a'), [1, atom('b')]);
assert.equal(structure1.match(1), false);
assert.equal(structure1.match("foo"), false);
assert.equal(structure1.match(1.2), false);
assert.equal(structure1.match(atom('a')), false);

// structure match similar structure

var bindings = binding(0);
var structure1b = structure(atom('a'), [1, atom('b')]);
assert.equal(structure1.match(structure1b, bindings), true);
assert.equal(structure1b.match(structure1, bindings), true);

// structure does not match not similar structure

var structure2 = structure(atom('a'), [2, atom('b')]);
var structure3 = structure(atom('a'), [1, atom('c')]);
var structure4 = structure(atom('c'), [1, atom('b')]);
var structure5 = structure(atom('a'), [1, atom('b'), 3]);

assert.equal(structure1.match(structure2, bindings), false);
assert.equal(structure1.match(structure3, bindings), false);
assert.equal(structure1.match(structure4, bindings), false);
assert.equal(structure1.match(structure5, bindings), false);

// structure has nvariables, nanonymous == 0

var structure1 = structure(atom('a'), [2, atom('b')]);
assert.equal(structure1.nvariables, 0);
assert.equal(structure1.nanonymous, 0);
assert.equal(structure.variables, null);

// structure with one variable

var structure1 = structure(atom('a'), [2, variable('X')]);
assert.equal(structure1.nvariables, 1);
assert.equal(structure1.nanonymous, 0);
assert.ok(structure1.variables);
assert.equal(structure1.variables.length, 1);
assert.equal(structure1.variables[0], 'X');

// structure with two variable

var structure1 = structure(atom('a'), [variable('Y'), variable('X')]);
assert.equal(structure1.nvariables, 2);
assert.equal(structure1.nanonymous, 0);
assert.ok(structure1.variables);
assert.equal(structure1.variables.length, 2);
assert.equal(structure1.variables[0], 'Y');
assert.equal(structure1.variables[1], 'X');

// structure with functor variable

var structure1 = structure(variable('Z'), [variable('Y'), variable('X')]);
assert.equal(structure1.nvariables, 3);
assert.equal(structure1.nanonymous, 0);
assert.ok(structure1.variables);
assert.equal(structure1.variables.length, 3);
assert.equal(structure1.variables[0], 'Z');
assert.equal(structure1.variables[1], 'Y');
assert.equal(structure1.variables[2], 'X');

// structure with repeated variable

var structure1 = structure(atom('a'), [variable('X'), variable('X')]);
assert.equal(structure1.nvariables, 1);
assert.equal(structure1.nanonymous, 0);
assert.ok(structure1.variables);
assert.equal(structure1.variables.length, 1);
assert.equal(structure1.variables[0], 'X');

// structure with items as arguments in constructor

var structure1 = structure(atom('a'), 1, 2, 3);
assert.equal(structure1.asString(), "a(1, 2, 3)");
var structure2 = structure(atom('b'), variable('X'), atom('a'), 3);
assert.equal(structure2.asString(), "b(X, a, 3)");

// structure with structures with variables

var structure1 = structure(atom('a'), structure(atom('b'), variable('X')), structure(atom('c'), variable('Y')), structure(atom('d'), variable('X')));
assert.equal(structure1.nvariables, 2);
assert.equal(structure1.nanonymous, 0);
assert.ok(structure1.variables);
assert.equal(structure1.variables.length, 2);
assert.equal(structure1.variables[0], 'X');
assert.equal(structure1.variables[1], 'Y');

// variables annotated with offset in a structure

var variablex = variable('X');
var variablex2 = variable('X');
var variabley = variable('Y');
var structure1 = structure(atom('a'), structure(atom('b'), variablex), structure(atom('c'), variabley), structure(atom('d'), variablex2));

assert.equal(variablex.offset, 0);
assert.equal(variabley.offset, 1);
assert.equal(variablex2.offset, 0);

// anonymous variables counted and annotated with offset

var anon1 = variable('_');
var anon2 = variable('_');
var anon3 = variable('_');
var structure1 = structure(atom('a'), structure(atom('b'), anon1), structure(atom('c'), anon2), structure(atom('d'), anon3));

assert.equal(structure1.nvariables, 0);
assert.equal(structure1.nanonymous, 3);
assert.equal(anon1.offset, 0);
assert.equal(anon2.offset, 1);
assert.equal(anon3.offset, 2);

// structure with variable match structure with atom

var structure1 = structure(atom('a'), [1, atom('b')]);
var structure1x = structure(atom('a'), [1, variable('X')]);
var bindings = binding(1);
var result = structure1x.match(structure1, bindings);
assert.ok(result);
var value = bindings.get(0);
assert.ok(value);
assert.equal(value.name, 'b');

// structure with atom match structure with variable

var structure1 = structure(atom('a'), [1, atom('b')]);
var structure1x = structure(atom('a'), [1, variable('X')]);
var bindings = binding(1);
var result = structure1.match(structure1x, bindings);
assert.ok(result);
var value = bindings.get(0);
assert.ok(value);
assert.equal(value.name, 'b');

// structure with variables don't match

var structure1 = structure(atom('a'), [1, 2, 3]);
var structure1xy = structure(atom('a'), [variable('X'), variable('Y'), variable('Y')]);
var bindings = binding(2);
assert.equal(structure1xy.match(structure1, bindings), false);
assert.equal(bindings.get(0), null);
assert.equal(bindings.get(1), null);

// structure match variable

var structure1 = structure(atom('a'), 1, 2, 3);
var varx = variable('X');
varx.offset = 0;
var bindings = binding(1);
assert.equal(structure1.match(varx, bindings), true);
assert.strictEqual(bindings.get(0), structure1);

// bound variables that not matches

var varx = variable('X');
var vary = variable('Y');
var structure1 = structure(atom('a'), varx, vary, varx);
var structure2 = structure(atom('a'), structure(atom('b'), 1), structure(atom('c'), 2), vary);
varx.offset = 0;
vary.offset = 1;
var bindings = binding(2);
assert.equal(structure1.match(structure2, bindings), false);
assert.equal(bindings.get(0), null);
assert.equal(bindings.get(1), null);

// match structures with cycles

var varx = variable('X');
var vary = variable('Y');
var structure1 = structure(atom('a'), varx, vary);
var structure2 = structure(atom('a'), structure(atom('b'), vary), structure(atom('c'), varx));
varx.offset = 0;
vary.offset = 1;
var bindings = binding(2);
assert.equal(structure1.match(structure2, bindings), true);
assert.ok(bindings.get(0));
assert.ok(bindings.get(1));

// match variables with cycles

var varx = variable('X');
var vary = variable('Y');
var structure1 = structure(atom('a'), varx, vary, varx);
var structure2 = structure(atom('a'), structure(atom('b'), varx), structure(atom('b'), vary), vary);
varx.offset = 0;
vary.offset = 1;
var bindings = binding(2);
assert.equal(structure1.match(structure2, bindings), true);
assert.ok(bindings.get(0));
assert.ok(bindings.get(1));

// match variables with cross cycles

var varx = variable('X');
var vary = variable('Y');
var structure1 = structure(atom('a'), varx, vary, varx);
var structure2 = structure(atom('a'), structure(atom('b'), vary), structure(atom('b'), varx), vary);
varx.offset = 0;
vary.offset = 1;
var bindings = binding(2);
assert.equal(structure1.match(structure2, bindings), true);
assert.ok(bindings.get(0));
assert.ok(bindings.get(1));
