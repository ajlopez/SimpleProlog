
const variable = require('../lib/variable');
const binding = require('../lib/binding');
const atom = require('../lib/atom');
    
exports['variable as function'] = function (test) {
    test.ok(variable);
    test.equal(typeof variable, 'function');
}

exports['create variable'] = function (test) {
    const result = variable('X');
    
    test.ok(result);
    test.equal(result.name(), 'X');
    test.equal(result.asString(), 'X');
    test.equal(result.variable(), true);
    test.equal(result.structure(), false);
	test.equal(result.atom(), false);
    test.equal(result.offset(), undefined);
}

exports['create variable with offset'] = function (test) {
    const result = variable('X', 10);
    
    test.ok(result);
    test.equal(result.name(), 'X');
    test.equal(result.asString(), 'X');
    test.equal(result.variable(), true);
    test.equal(result.offset(), 10);
}

exports['unbound variable match atom'] = function (test) {
    const varx = variable('X');
    
    test.ok(varx);
    
    const bindings = binding(1);
    
    const atomx = atom('x');
    
    test.equal(varx.match(atomx, bindings), true);

    const result = bindings.get(0);
    
    test.ok(result);
    test.strictEqual(result, atomx);
}

exports['bound variable does not match other atom'] = function (test) {
    const varx = variable('X');
    const atomx = atom('x');
    const bindings = binding(1);
    
    varx.match(atomx, bindings);
    
    const atomy = atom('y');
    
    test.equal(varx.match(atomy, bindings), false);

    const result = bindings.get(0);
    
    test.ok(result);
    test.strictEqual(result, atomx);
}

exports['bound variable match atom with same name'] = function (test) {
    const varx = variable('X');
    const atomx = atom('x');
    const bindings = binding(1);
    
    varx.match(atomx, bindings);
    
    const atomx2 = atom('x');
    
    test.equal(varx.match(atomx2, bindings), true);

    const result = bindings.get(0);
    
    test.ok(result);
    test.strictEqual(result, atomx);
}

exports['unbound variables match'] = function (test) {
    const varx = variable('X');
    const vary = variable('Y');
    const bindings = binding(2);
    
    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), varx);
    test.equal(bindings.get(0), null);
}

exports['unbound variables match, inverse order'] = function (test) {
    const varx = variable('X', 0);
    const vary = variable('Y', 1);
    const bindings = binding(2);
    
    test.equal(vary.match(varx, bindings), true);
    test.strictEqual(bindings.get(1), varx);
    test.equal(bindings.get(0), null);
}

exports['variable matches same offset variable'] = function (test) {
    const varx = variable('X', 0);
    const varx2 = variable('X', 0);
    
    test.equal(varx.match(varx2), true);
}

exports['bound variable to atom matches variable'] = function (test) {
    const varx = variable('X', 0);
    const vary = variable('Y', 1);
    const atoma = atom('a');

    const bindings = binding(2);
    
    bindings.set(0, atoma);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), atoma);
    test.strictEqual(bindings.get(0), atoma);
}

exports['bound variable to integer matches variable'] = function (test) {
    const varx = variable('X', 0);
    const vary = variable('Y', 1);

    const bindings = binding(2);
    
    bindings.set(0, 3);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), 3);
    test.strictEqual(bindings.get(0), 3);
}

exports['bound variable to integer matches bound variable to same integer'] = function (test) {
    const varx = variable('X', 0);
    const vary = variable('Y', 1);

    const bindings = binding(2);
    
    bindings.set(0, 3);
    bindings.set(1, 3);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), 3);
    test.strictEqual(bindings.get(0), 3);
}

exports['bound variable to atom matches bound variable to same atom'] = function (test) {
    const varx = variable('X', 0);
    const vary = variable('Y', 1);
    const atoma = atom('a');

    const bindings = binding(2);
    
    bindings.set(0, atoma);
    bindings.set(1, atoma);

    test.equal(varx.match(vary, bindings), true);
    test.strictEqual(bindings.get(1), atoma);
    test.strictEqual(bindings.get(0), atoma);
}

