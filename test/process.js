
const simpleprolog = require('..');

exports['process simple fact'] = function (test) {
    const base = simpleprolog.base();
    
    simpleprolog.process('mortal(socrates).', base);
    
    const parser = simpleprolog.parser('mortal(X)');
    const query = parser.parse('structure');
    
    const result = base.query(query);
    
    test.ok(result);
    test.ok(result.X);
    test.equal(result.X.name(), 'socrates');
}

exports['process two facts'] = function (test) {
    const base = simpleprolog.base();
    
    simpleprolog.process('mortal(socrates). mortal(plato).', base);
    
    const parser = simpleprolog.parser('mortal(X)');
    const query = parser.parse('structure');
    
    const result = [];
    
    base.query(query, function (err, data, next) {
        test.ok(!err);
        
        if (data) {
            result.push(data);
            next();
        }
    });
    
    test.ok(result);
    test.equal(result.length, 2);
    test.equal(result[0].X.name(), 'socrates');
    test.equal(result[1].X.name(), 'plato');
}

