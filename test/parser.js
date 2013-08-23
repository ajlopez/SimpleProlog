
var parser = require('../lib/parser');

exports['parse atom'] = function (test) {
    var myparser = parser('a');
    var result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name, 'a');
}

exports['parse atom with spaces'] = function (test) {
    var myparser = parser(' a   ');
    var result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name, 'a');
}

exports['parse empty string as null'] = function (test) {
    var myparser = parser('');
    var result = myparser.parse();
    
    test.equal(result, null);
}

exports['parse null as null'] = function (test) {
    var myparser = parser(null);
    var result = myparser.parse();
    
    test.equal(result, null);
}

exports['parse variable'] = function (test) {
    var myparser = parser('X');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.variable);
    test.equal(result.name, 'X');
}

exports['parse structure with arity 1'] = function (test) {
    var myparser = parser('a(1)');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name, 'a');
    test.equal(result.arity, 1);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, "a:1");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 1);
    test.equal(result.args[0], 1);
}