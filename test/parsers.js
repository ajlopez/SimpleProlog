
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

exports['parse structure with atom functor and integer argument'] = function (test) {
    const parser = parsers.parser('a(42)');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "a:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0], 42);
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure with atom functor and atom argument'] = function (test) {
    const parser = parsers.parser('a(b)');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "a:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0].name(), 'b');
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure with atom functor and named variable argument'] = function (test) {
    const parser = parsers.parser('a(X)');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 1);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "a:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0].name(), 'X');
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure with atom functor and variable anonymous argument'] = function (test) {
    const parser = parsers.parser('a(_)');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 1);
    test.equal(result.signature(), "a:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0].name(), '_');
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure with atom functor and two argument'] = function (test) {
    const parser = parsers.parser('a(b, 42)');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 2);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "a:2");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 2);
    test.equal(result.arguments()[0].name(), 'b');
    test.equal(result.arguments()[1], 42);
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure with atom functor and three argument'] = function (test) {
    const parser = parsers.parser('a(b, 42, 1)');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 3);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "a:3");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 3);
    test.equal(result.arguments()[0].name(), 'b');
    test.equal(result.arguments()[1], 42);
    test.equal(result.arguments()[2], 1);
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure with atom functor and structure argument'] = function (test) {
    const parser = parsers.parser('a(b(42))');
    
    const result = parser.parse('structure');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 1);
    
    test.equal(result.asString(), 'a(b(42))');
    
    test.equal(parser.parse('structure'), null);
};

exports['parse structure as fact'] = function (test) {
    const parser = parsers.parser('a(b(42)).');
    
    const result = parser.parse('fact');
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), 'a');
    test.equal(result.arity(), 1);
    
    test.equal(result.asString(), 'a(b(42))');
    
    test.equal(parser.parse('fact'), null);
};

exports['parse rule with one structure'] = function (test) {
    const parser = parsers.parser('mortal(X) :- greek(X)');
    
    const result = parser.parse('rule');
    
    test.ok(result);
    
    test.equal(result.asString(), 'mortal(X) :- greek(X)');
    
    test.equal(parser.parse('rule'), null);
};

exports['parse rule with two structures'] = function (test) {
    const parser = parsers.parser('mortal(X) :- animal(X), greek(X)');
    
    const result = parser.parse('rule');
    
    test.ok(result);
    
    test.equal(result.asString(), 'mortal(X) :- animal(X), greek(X)');
    
    test.equal(parser.parse('rule'), null);
};

exports['parse rule as fact'] = function (test) {
    const parser = parsers.parser('mortal(X) :- animal(X), greek(X).');
    
    const result = parser.parse('fact');
    
    test.ok(result);
    
    test.equal(result.asString(), 'mortal(X) :- animal(X), greek(X)');
    
    test.equal(parser.parse('fact'), null);
};

exports['parse query'] = function (test) {
    const parser = parsers.parser('?- X, Y, Z');
    
    const result = parser.parse('query');
    
    test.ok(result);
    
    test.equal(result.asString(), '?- X, Y, Z');
    
    test.equal(parser.parse('query'), null);
};
