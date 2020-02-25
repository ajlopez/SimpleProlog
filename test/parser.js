
const parser = require('../lib/parser');

exports['parse atom'] = function (test) {
    const myparser = parser('a');
    const result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
	
	test.equal(myparser.parse(), null);
}

exports['parse atom and point'] = function (test) {
    const myparser = parser('a.');
    const result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
	
	test.equal(myparser.parse(), null);
}

exports['parse atom with spaces'] = function (test) {
    const myparser = parser(' a   ');
    const result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
}

exports['parse empty string as null'] = function (test) {
    const myparser = parser('');
    const result = myparser.parse();
    
    test.equal(result, null);
}

exports['parse null as null'] = function (test) {
    const myparser = parser(null);
    const result = myparser.parse();
    
    test.equal(result, null);
}

exports['parse variable'] = function (test) {
    const myparser = parser('X');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.variable);
    test.equal(result.name(), 'X');
}

exports['parse structure with arity 1'] = function (test) {
    const myparser = parser('a(1)');
    const result = myparser.parse();
    
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
    test.equal(result.arguments()[0], 1);
}

exports['parse structure with arity 2'] = function (test) {
    const myparser = parser('a(1,2)');
    const result = myparser.parse();
    
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
    test.equal(result.arguments()[0], 1);
    test.equal(result.arguments()[1], 2);
}

exports['parse and structure with two atoms'] = function (test) {
    const myparser = parser('a,b');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), ',');
    test.equal(result.arity(), 2);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), ",:2");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 2);
    test.equal(result.arguments()[0].name(), 'a');
    test.equal(result.arguments()[1].name(), 'b');
}

exports['parse and structure with two structures'] = function (test) {
    const myparser = parser('a(1),b(2,3)');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), ',');
    test.equal(result.arity(), 2);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), ",:2");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 2);
    test.equal(result.arguments()[0].signature(), 'a:1');
    test.equal(result.arguments()[1].signature(), 'b:2');
}

exports['parse and structure with three structures'] = function (test) {
    const myparser = parser('a(1),b(2,3),c(4,5,6)');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), ',');
    test.equal(result.arity(), 3);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), ",:3");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 3);
    test.equal(result.arguments()[0].signature(), 'a:1');
    test.equal(result.arguments()[1].signature(), 'b:2');
    test.equal(result.arguments()[2].signature(), 'c:3');
}

exports['parse simple rule'] = function (test) {
    const myparser = parser('a :- b');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), ':-');
    test.equal(result.arity(), 2);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), ":-:2");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 2);
    test.equal(result.arguments()[0].name(), 'a');
    test.equal(result.arguments()[1].name(), 'b');
}

exports['parse rule with and body'] = function (test) {
    const myparser = parser('a :- b,c');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), ':-');
    test.equal(result.arity(), 2);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), ":-:2");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 2);
    test.equal(result.arguments()[0].name(), 'a');
    test.equal(result.arguments()[1].signature(), ',:2');
}

exports['parse simple query'] = function (test) {
    const myparser = parser('?- a');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), '?-');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "?-:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0].name(), 'a');
}

exports['parse query with and body'] = function (test) {
    const myparser = parser('?- a,b');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), '?-');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "?-:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0].signature(), ',:2');
	
	test.equal(myparser.parse(), null);
}

exports['parse query with and body and point'] = function (test) {
    const myparser = parser('?- a,b.');
    const result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor());
    test.equal(result.functor().name(), '?-');
    test.equal(result.arity(), 1);
    test.equal(result.nvariables(), 0);
    test.equal(result.nanonymous(), 0);
    test.equal(result.signature(), "?-:1");
    test.ok(result.arguments());
    test.ok(Array.isArray(result.arguments()));
    test.equal(result.arguments().length, 1);
    test.equal(result.arguments()[0].signature(), ',:2');
	
	test.equal(myparser.parse(), null);
}
