
var atom = require('../lib/atom'),
    binding = require('../lib/binding'),
    variable = require('../lib/variable');
    
exports['atom as a function'] = function (test) {
    test.ok(atom);
    test.equal(typeof atom, 'function');
}

exports['create atom with name'] = function (test) {
    var atomfoo = atom('foo');
    test.ok(atomfoo);
    test.equal(atomfoo.name(), 'foo');
    test.equal(atomfoo.asString(), 'foo');
	test.equal(atomfoo.structure(), false);
	test.equal(atomfoo.variable(), false);
	test.equal(atomfoo.atom(), true);
}

exports['match atom with same name'] = function (test) {
    var atomfoo = atom('foo');
    var atomfoo2 = atom('foo');
    test.ok(atomfoo.match(atomfoo2));
}

exports['no match atom with other name'] = function (test) {
    var atomfoo = atom('foo');
    var atombar = atom('bar');
    test.ok(!atomfoo.match(atombar));
}

exports['no match with number'] = function (test) {
    var atomfoo = atom('foo');
    test.ok(!atomfoo.match(42));
}

exports['no match with string'] = function (test) {
    var atomfoo = atom('foo');
    test.ok(!atomfoo.match("foo"));
}

exports['no match with null'] = function (test) {
    var atomfoo = atom('foo');

    test.ok(!atomfoo.match(null));
}

exports['no match with undefined'] = function (test) {
    var atomfoo = atom('foo');
    test.ok(!atomfoo.match(null));
}

exports['no match with false'] = function (test) {
    var atomfoo = atom('foo');
    test.ok(!atomfoo.match(false));
}

exports['no match with true'] = function (test) {
    var atomfoo = atom('foo');
    test.ok(!atomfoo.match(true));
}

exports['match with variable'] = function (test) {
    var atomfoo = atom('foo');
    var bindings = binding(1);
    var varx = variable('X', 0);
    varx.offset = 0;
    test.ok(atomfoo.match(varx, bindings));
    var value = bindings.get(0);
    test.ok(value);
    test.equal(value.name(), 'foo');
}

