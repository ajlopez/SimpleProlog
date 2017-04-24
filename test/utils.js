var utils = require('../lib/utils');
var variable = require('../lib/variable');
var atom = require('../lib/atom');
var structure = require('../lib/structure');

exports['variable is a variable'] = function (test) {
	var var1 = variable('X');
	test.ok(utils.isVariable(var1));
};

exports['atom is not a variable'] = function (test) {
	var atom1 = atom('a');
	test.equal(utils.isVariable(atom1), false);
};

exports['structure is not a variable'] = function (test) {
	var structure1 = structure(atom('a'), variable('X'));;
	test.equal(utils.isVariable(structure1), false);
};

