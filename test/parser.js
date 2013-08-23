
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