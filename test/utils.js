const utils = require('../lib/utils');
const variable = require('../lib/variable');
const atom = require('../lib/atom');
const structure = require('../lib/structure');
const parsers = require('../lib/parsers');

exports['variable is a variable'] = function (test) {
	const var1 = variable('X');
    
	test.ok(utils.isVariable(var1));
};

exports['atom is not a variable'] = function (test) {
	const atom1 = atom('a');
    
	test.equal(utils.isVariable(atom1), false);
};

exports['structure is not a variable'] = function (test) {
	const structure1 = structure(atom('a'), variable('X'));;
    
	test.equal(utils.isVariable(structure1), false);
};

exports['variable is not an atom'] = function (test) {
	const var1 = variable('X');
    
	test.equal(utils.isAtom(var1), false);
};

exports['atom is an atom'] = function (test) {
	const atom1 = atom('a');
    
	test.equal(utils.isAtom(atom1), true);
};

exports['structure is not an atom'] = function (test) {
	const structure1 = structure(atom('a'), variable('X'));;
    
	test.equal(utils.isAtom(structure1), false);
};

exports['variable is not an structure'] = function (test) {
	const var1 = variable('X');
    
	test.equal(utils.isStructure(var1), false);
};

exports['atom is not an structure'] = function (test) {
	const atom1 = atom('a');
    
	test.equal(utils.isStructure(atom1), false);
};

exports['structure is an structure'] = function (test) {
	const structure1 = structure(atom('a'), variable('X'));;
    
	test.equal(utils.isStructure(structure1), true);
};

exports['parsed structure is query'] = function (test) {
    const fact = parsers.parser('?- X, Y.').parse('fact');
    
    test.ok(utils.isStructure(fact));
    test.ok(utils.isQuery(fact));
};

exports['parsed structure is not a query'] = function (test) {
    const fact = parsers.parser('a(X) :- b(Y).').parse('fact');

    test.ok(fact);
    test.ok(utils.isStructure(fact));
    test.ok(!utils.isQuery(fact));
};

exports['parsed atom is not a query'] = function (test) {
    const fact = parsers.parser('a.').parse('fact');
    
    test.ok(fact);
    test.ok(utils.isAtom(fact));
    test.ok(!utils.isStructure(fact));
    test.ok(!utils.isQuery(fact));
};

