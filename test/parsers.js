
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

exports['parse structure with atom functor and no arguments'] = function (test) {
    const parser = parsers.parser('a()');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 0);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "a:0");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 0);
    
    test.equal(parser.parse('structure'), null);
};

