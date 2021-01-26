
const structure = require('../lib/structure');
const atom = require('../lib/atom');
const variable = require('../lib/variable');
const binding = require('../lib/binding');
    
exports['structure as a function'] = function (test) {
    test.ok(structure);
    test.equal(typeof structure, 'function');
}

exports['structure with arguments'] = function (test) {
    const result = structure(atom('a'), [1, 2]);
    
    test.ok(result);
    test.ok(result.functor());
	test.equal(result.atom(), false);
	test.equal(result.variable(), false);
	test.equal(result.structure(), true);
    test.equal(result.functor().asString(), 'a');
    test.equal(result.arity(), 2);
    test.equal(result.asString(), 'a(1, 2)');
    test.equal(result.signature(), 'a:2');
}

exports['structure with atoms as arguments'] = function (test) {
    const result = structure(atom('a'), [atom('b'), atom('c'), atom('d')]);
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().asString(), 'a');
    test.equal(result.arity(), 3);
    test.equal(result.asString(), 'a(b, c, d)');
    test.equal(result.signature(), 'a:3');
}

exports['structure with only functor'] = function (test) {
    const result = structure(atom('a'));
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().asString(), 'a');
    test.equal(result.arity(), 0);
    test.equal(result.asString(), 'a()');
    test.equal(result.signature(), 'a:0');
}

exports['structure does not match integer, string, real, atom'] = function (test) {
    const structure1 = structure(atom('a'), [1, atom('b')]);
    
    test.equal(structure1.match(1), false);
    test.equal(structure1.match("foo"), false);
    test.equal(structure1.match(1.2), false);
    test.equal(structure1.match(atom('a')), false);
}

exports['structure match similar structure'] = function (test) {
    const bindings = binding(0);
    const structure1 = structure(atom('a'), [1, atom('b')]);
    const structure1b = structure(atom('a'), [1, atom('b')]);
    
    test.equal(structure1.match(structure1b, bindings), true);
    test.equal(structure1b.match(structure1, bindings), true);
}

exports['structure does not match not similar structure'] = function (test) {
    const bindings = binding(0);
    const structure1 = structure(atom('a'), [1, atom('b')]);
    const structure2 = structure(atom('a'), [2, atom('b')]);
    const structure3 = structure(atom('a'), [1, atom('c')]);
    const structure4 = structure(atom('c'), [1, atom('b')]);
    const structure5 = structure(atom('a'), [1, atom('b'), 3]);

    test.equal(structure1.match(structure2, bindings), false);
    test.equal(structure1.match(structure3, bindings), false);
    test.equal(structure1.match(structure4, bindings), false);
    test.equal(structure1.match(structure5, bindings), false);
}

exports['structure has nvariables, nanonymous == 0'] = function (test) {
    const structure1 = structure(atom('a'), [2, atom('b')]);
    
    test.equal(structure1.nvariables(), 0);
    test.equal(structure1.nanonymous(), 0);
    test.ok(structure1.variables);
    test.equal(structure1.variables(), 0);
}

exports['structure with one variable'] = function (test) {
    const structure1 = structure(atom('a'), [2, variable('X')]);
    
    test.equal(structure1.nvariables(), 1);
    test.equal(structure1.nanonymous(), 0);
    test.ok(structure1.variables());
    test.equal(structure1.variables().length, 1);
    test.equal(structure1.variables()[0], 'X');
}

exports['structure with two variable'] = function (test) {
    const structure1 = structure(atom('a'), [variable('Y'), variable('X')]);
    
    test.equal(structure1.nvariables(), 2);
    test.equal(structure1.nanonymous(), 0);
    test.ok(structure1.variables());
    test.equal(structure1.variables().length, 2);
    test.equal(structure1.variables()[0], 'Y');
    test.equal(structure1.variables()[1], 'X');
}

exports['structure with functor variable'] = function (test) {
    const structure1 = structure(variable('Z'), [variable('Y'), variable('X')]);
    
    test.equal(structure1.nvariables(), 3);
    test.equal(structure1.nanonymous(), 0);
    test.ok(structure1.variables());
    test.equal(structure1.variables().length, 3);
    test.equal(structure1.variables()[0], 'Z');
    test.equal(structure1.variables()[1], 'Y');
    test.equal(structure1.variables()[2], 'X');
}

exports['structure with repeated variable'] = function (test) {
    const structure1 = structure(atom('a'), [variable('X'), variable('X')]);
    
    test.equal(structure1.nvariables(), 1);
    test.equal(structure1.nanonymous(), 0);
    test.ok(structure1.variables());
    test.equal(structure1.variables().length, 1);
    test.equal(structure1.variables()[0], 'X');
}

exports['structure with items as arguments in constructor'] = function (test) {
    const structure1 = structure(atom('a'), 1, 2, 3);
    
    test.equal(structure1.asString(), "a(1, 2, 3)");
    
    const structure2 = structure(atom('b'), variable('X'), atom('a'), 3);
    
    test.equal(structure2.asString(), "b(X, a, 3)");
}

exports['structure with structures with variables'] = function (test) {
    const structure1 = structure(atom('a'), structure(atom('b'), variable('X')), structure(atom('c'), variable('Y')), structure(atom('d'), variable('X')));
    
    test.equal(structure1.nvariables(), 2);
    test.equal(structure1.nanonymous(), 0);
    test.ok(structure1.variables());
    test.equal(structure1.variables().length, 2);
    test.equal(structure1.variables()[0], 'X');
    test.equal(structure1.variables()[1], 'Y');
}

exports['variables annotated with offset in a structure'] = function (test) {
    const variablex = variable('X');
    const variabley = variable('Y');
    const variablex2 = variable('X');
    const structure1 = structure(atom('a'), structure(atom('b'), variablex), structure(atom('c'), variabley), structure(atom('d'), variablex2));

    test.equal(variablex.offset(), 0);
    test.equal(variabley.offset(), 1);
    test.equal(variablex2.offset(), 0);
}

exports['anonymous variables counted and annotated with offset'] = function (test) {
    const anon1 = variable('_');
    const anon2 = variable('_');
    const anon3 = variable('_');
    const structure1 = structure(atom('a'), structure(atom('b'), anon1), structure(atom('c'), anon2), structure(atom('d'), anon3));

    test.equal(structure1.nvariables(), 0);
    test.equal(structure1.nanonymous(), 3);
    test.equal(anon1.offset(), 0);
    test.equal(anon2.offset(), 1);
    test.equal(anon3.offset(), 2);
}

exports['structure with variable match structure with atom'] = function (test) {
    const structure1 = structure(atom('a'), [1, atom('b')]);
    const structure1x = structure(atom('a'), [1, variable('X')]);
    const bindings = binding(1);
    const result = structure1x.match(structure1, bindings);
    test.ok(result);
    const value = bindings.get(0);
    
    test.ok(value);
    test.equal(value.name(), 'b');
}

exports['structure with atom match structure with variable'] = function (test) {
    const structure1 = structure(atom('a'), [1, atom('b')]);
    const structure1x = structure(atom('a'), [1, variable('X')]);
    const bindings = binding(1);
    const result = structure1.match(structure1x, bindings);
    
    test.ok(result);
    
    const value = bindings.get(0);
    
    test.ok(value);
    test.equal(value.name(), 'b');
}

exports['structure with variables don\'t match'] = function (test) {
	const varx = variable('X');
	const vary = variable('Y');
    const structure1 = structure(atom('a'), [1, 2, 3]);
    const structure1xy = structure(atom('a'), [varx, vary, vary]);
    const bindings = binding(2);
    
    test.equal(structure1xy.match(structure1, bindings), false);
    test.equal(bindings.get(0), null);
    test.equal(bindings.get(1), null);
}

exports['structure match variable'] = function (test) {
    const structure1 = structure(atom('a'), 1, 2, 3);
    const varx = variable('X');
    const bindings = binding(1);
    
    test.equal(structure1.match(varx, bindings), true);
    test.strictEqual(bindings.get(0), structure1);
}

exports['bound variables that not matches'] = function (test) {
    const varx = variable('X');
    const vary = variable('Y');
    const structure1 = structure(atom('a'), varx, vary, varx);
    const structure2 = structure(atom('a'), structure(atom('b'), 1), structure(atom('c'), 2), vary);
    const bindings = binding(2);
    
    test.equal(structure1.match(structure2, bindings), false);
    test.equal(bindings.get(0), null);
    test.equal(bindings.get(1), null);
}

exports['match structures with cycles'] = function (test) {
    const varx = variable('X');
    const vary = variable('Y');
    const structure1 = structure(atom('a'), varx, vary);
    const structure2 = structure(atom('a'), structure(atom('b'), vary), structure(atom('c'), varx));
    const bindings = binding(2);
    
    test.equal(structure1.match(structure2, bindings), true);
    test.ok(bindings.get(0));
    test.ok(bindings.get(1));
}

exports['match variables with cycles'] = function (test) {
    const varx = variable('X');
    const vary = variable('Y');
    const structure1 = structure(atom('a'), varx, vary, varx);
    const structure2 = structure(atom('a'), structure(atom('b'), varx), structure(atom('b'), vary), vary);
    const bindings = binding(2);
    
    test.equal(structure1.match(structure2, bindings), true);
    test.ok(bindings.get(0));
    test.ok(bindings.get(1));
}

exports['match variables with cross cycles'] = function (test) {
    const varx = variable('X');
    const vary = variable('Y');
    const structure1 = structure(atom('a'), varx, vary, varx);
    const structure2 = structure(atom('a'), structure(atom('b'), vary), structure(atom('b'), varx), vary);
    const bindings = binding(2);
    
    test.equal(structure1.match(structure2, bindings), true);
    test.ok(bindings.get(0));
    test.ok(bindings.get(1));
}

exports['rule structure as string'] = function (test) {
    const varx = variable('X');
    const vary = variable('Y');
    const varz = variable('Z');
    const structure1 = structure(atom(':-'), varx, vary, varz);
    
    test.equal(structure1.asString(), 'X :- Y, Z');
}

