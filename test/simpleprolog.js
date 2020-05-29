
const sp = require('..');

exports['base as a function'] = function (test) {
    test.ok(sp.base);
    test.equal(typeof sp.base, 'function');
}

exports['query an empty base'] = function (test) {
    const base = sp.base();
    const structure = sp.structure(sp.atom('a'));
    
    test.equal(base.query(structure), false);
}

exports['assert and query'] = function (test) {
    const base = sp.base();
    const structure = sp.structure(sp.atom('a'));
    
    base.assert(structure);   
    test.equal(base.query(structure), true);
}

exports['query unknown structure'] = function (test) {
    const base = sp.base();

    const structure = sp.structure(sp.atom('b'), [1, 2]);
    test.equal(base.query(structure), false);
}

exports['query using a variable'] = function (test) {
    const base = sp.base();
    const structure1 = sp.structure(sp.atom('a'), sp.atom('b'));
    const structure2 = sp.structure(sp.atom('a'), sp.atom('c'));
    
    base.assert(structure1);
    base.assert(structure2);

    const structurex = sp.structure(sp.atom('a'), sp.variable('X'));

    const result = base.query(structurex);

    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(result.X);
    test.equal(result.X.name(), 'b');
}

exports['parse atom'] = function (test) {
    const parser = sp.parser('a');
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
	
	test.equal(parser.parse(), null);
}

exports['parse atom and point'] = function (test) {
    const parser = sp.parser('a.');
    const result = parser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
	
	test.equal(parser.parse(), null);
}

