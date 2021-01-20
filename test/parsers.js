
const parsers = require('../lib/parsers');

exports['parse atom'] = function (test) {
    const parser = parsers.parser('a');
    
    const result = parser.parse('atom');
    
    test.ok(result);
    test.equal(result.name(), 'a');
    
    test.equal(parser.parse('atom'), null);
};

exports['parse atom with spaces'] = function (test) {
    const parser = parsers.parser('  a   ');
    
    const result = parser.parse('atom');
    
    test.ok(result);
    test.equal(result.name(), 'a');
    
    test.equal(parser.parse('atom'), null);
};

exports['parse variable'] = function (test) {
    const parser = parsers.parser('X');
    
    const result = parser.parse('variable');
    
    test.ok(result);
    test.ok(result.variable);
    test.equal(result.name(), 'X');
    
    test.equal(parser.parse('variable'), null);
};

exports['parse variable with spaces'] = function (test) {
    const parser = parsers.parser('  X   ');
    
    const result = parser.parse('variable');
    
    test.ok(result);
    test.ok(result.variable);
    test.equal(result.name(), 'X');
    
    test.equal(parser.parse('variable'), null);
};

exports['parse integer'] = function (test) {
    const parser = parsers.parser('1');
    
    const result = parser.parse('integer');
    
    test.ok(result);
    test.equal(result, 1);
    
    test.equal(parser.parse('integer'), null);
};

exports['parse variable with spaces'] = function (test) {
    const parser = parsers.parser('  1   ');
    
    const result = parser.parse('integer');
    
    test.ok(result);
    test.equal(result, 1);
    
    test.equal(parser.parse('integer'), null);
};
