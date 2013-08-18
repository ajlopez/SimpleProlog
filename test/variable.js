
var variable = require('../lib/variable'),
    binding = require('../lib/binding'),
    atom = require('../lib/atom');
    
exports['variable as function'] = function (test) {
    test.ok(variable);
    test.equal(typeof variable, 'function');
}

exports['create variable'] = function (test) {
    var result = variable('X');
    test.ok(result);
    test.equal(result.name, 'X');
    test.equal(result.asString(), 'X');
    test.equal(result.variable, true);
    test.equal(result.offset, undefined);
}

exports['create variable with offset'] = function (test) {
    var result = variable('X', 10);
    test.ok(result);
    test.equal(result.name, 'X');
    test.equal(result.asString(), 'X');
    test.equal(result.variable, true);
    test.equal(result.offset, 10);
}

exports['unbound variable match atom'] = function (test) {
    var varx = variable('X', 0);
    test.ok(varx);
    test.strictEqual(varx.offset, 0);
    var bindings = binding(1);
    var atomx = atom('x');
    test.equal(varx.match(atomx, bindings), true);

    var result = bindings.get(0);
    test.ok(result);
    test.strictEqual(result, atomx);
}

exports['bound variable does not match other atom'] = function (test) {
    var varx = variable('X', 0);
    var atomx = atom('x');
    var bindings = binding(1);
    varx.match(atomx, bindings);
    
    var atomy = atom('y');
    test.equal(varx.match(atomy, bindings), false);

    var result = bindings.get(0);
    test.ok(result);
    test.strictEqual(result, atomx);
}

exports['bound variable match atom with same name'] = function (test) {
    var varx = variable('X', 0);
    var atomx = atom('x');
    var bindings = binding(1);
    varx.match(atomx, bindings);
    
    var atomx2 = atom('x');
    test.equal(varx.match(atomx2, bindings), true);

    var result = bindings.get(0);
    test.ok(result);
    test.strictEqual(result, atomx);
}

exports['unbound variables match'] = function (test) {
    var varx = variable('X', 0);
    var vary = variable('Y', 1);
    var bindings = binding(2);
    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), varx);
    test.equal(bindings.get(0), null);
}

exports['unbound variables match, inverse order'] = function (test) {
    var varx = variable('X', 0);
    var vary = variable('Y', 1);
    var bindings = binding(2);
    test.equal(vary.match(varx, bindings), true);
    test.strictEqual(bindings.get(1), varx);
    test.equal(bindings.get(0), null);
}

exports['variable matches same offset variable'] = function (test) {
    var varx = variable('X', 0);
    var varx2 = variable('X', 0);
    test.equal(varx.match(varx2), true);
}

exports['bound variable to atom matches variable'] = function (test) {
    var varx = variable('X', 0);
    var vary = variable('Y', 1);
    var atoma = atom('a');

    var bindings = binding(2);
    bindings.set(0, atoma);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), atoma);
    test.strictEqual(bindings.get(0), atoma);
}

exports['bound variable to integer matches variable'] = function (test) {
    var varx = variable('X', 0);
    var vary = variable('Y', 1);

    var bindings = binding(2);
    bindings.set(0, 3);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), 3);
    test.strictEqual(bindings.get(0), 3);
}

exports['bound variable to integer matches bound variable to same integer'] = function (test) {
    var varx = variable('X', 0);
    var vary = variable('Y', 1);

    var bindings = binding(2);
    bindings.set(0, 3);
    bindings.set(1, 3);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), 3);
    test.strictEqual(bindings.get(0), 3);
}

exports['bound variable to atom matches bound variable to same atom'] = function (test) {
    var varx = variable('X', 0);
    var vary = variable('Y', 1);
    var atoma = atom('a');

    var bindings = binding(2);
    bindings.set(0, atoma);
    bindings.set(1, atoma);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), atoma);
    test.strictEqual(bindings.get(0), atoma);
}