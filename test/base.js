
var base = require('../lib/base'),
    atom = require('../lib/atom'),
    variable = require('../lib/variable'),
    structure = require('../lib/structure');
    assert = require('assert');
    
exports['base as a function'] = function (test) {
    test.ok(base);
    test.equal(typeof base, 'function');
}

exports['query an empty base'] = function (test) {
    var base1 = base();
    var structure1 = structure(atom('a'));
    test.equal(base1.query(structure1), false);
}

exports['assert and query'] = function (test) {
    var base1 = base();
    var structure1 = structure(atom('a'));
    base1.assert(structure1);
    test.equal(base1.query(structure1), true);
}

exports['query unknown structure'] = function (test) {
    var base1 = base();

    var structure1 = structure(atom('b'), [1, 2]);
    test.equal(base1.query(structure1), false);
}

exports['query known structure with callback'] = function (test) {
    var base1 = base();
    var count = 0;
    var structure1 = structure(atom('a'));
    base1.assert(structure1);
    
    base1.query(structure1, function (err, result) {
        test.ok(!err);
        test.ok(result);
        count++;
    });

    test.equal(count, 1);
}

exports['query known structure with repeated callback'] = function (test) {
    var base1 = base();
    var count = 0;
    var structure1 = structure(atom('b'), [1, 2]);
    base1.assert(structure1);

    base1.query(structure1, function (err, result, next) {
        test.ok(!err);
        
        if (count)
            test.equal(result, false);
        else
            test.ok(result);
            
        count++;
        
        if (result)
            next();
    });

    test.equal(count, 2);
}

exports['query unknown structure with callback'] = function (test) {
    var base1 = base();
    var count = 0;
    var structure2 = structure(atom('b'), [1, 2]);
    
    base1.query(structure2, function (err, result) {
        test.ok(!err);
        test.equal(result, false);
        count++;
    });

    test.equal(count, 1);
}

exports['query using a variable'] = function (test) {
    var base1 = base();
    var structure1 = structure(atom('a'), atom('b'));
    var structure2 = structure(atom('a'), atom('c'));
    base1.assert(structure1);
    base1.assert(structure2);

    var structurex = structure(atom('a'), variable('X'));

    var result = base1.query(structurex);

    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(result.X);
    test.equal(result.X.name, 'b');
}

exports['query using a variable and repeated callback'] = function (test) {
    var base1 = base();
    var structure1 = structure(atom('a'), atom('b'));
    var structure2 = structure(atom('a'), atom('c'));
    base1.assert(structure1);
    base1.assert(structure2);
    
    var structurex = structure(atom('a'), variable('X'));

    var results = [];

    base1.query(structurex, function (err, result, next) {
        test.ok(!err);
        
        if (result) {
            results.push(result);
            next();
        }
    });

    test.equal(results.length, 2);
    test.equal(results[0].X.name, 'b');
    test.equal(results[1].X.name, 'c');
}
