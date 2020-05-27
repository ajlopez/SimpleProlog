
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

