
var parser = require('../lib/parser');

exports['parse atom'] = function (test) {
    var myparser = parser('a');
    var result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
	
	test.equal(myparser.parse(), null);
}

exports['parse atom and point'] = function (test) {
    var myparser = parser('a.');
    var result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
	
	test.equal(myparser.parse(), null);
}

exports['parse atom with spaces'] = function (test) {
    var myparser = parser(' a   ');
    var result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name(), 'a');
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
    test.equal(result.name(), 'X');
}

exports['parse structure with arity 1'] = function (test) {
    var myparser = parser('a(1)');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), 'a');
    test.equal(result.arity, 1);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, "a:1");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 1);
    test.equal(result.args[0], 1);
}

exports['parse structure with arity 2'] = function (test) {
    var myparser = parser('a(1,2)');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), 'a');
    test.equal(result.arity, 2);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, "a:2");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 2);
    test.equal(result.args[0], 1);
    test.equal(result.args[1], 2);
}

exports['parse and structure with two atoms'] = function (test) {
    var myparser = parser('a,b');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), ',');
    test.equal(result.arity, 2);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, ",:2");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 2);
    test.equal(result.args[0].name(), 'a');
    test.equal(result.args[1].name(), 'b');
}

exports['parse and structure with two structures'] = function (test) {
    var myparser = parser('a(1),b(2,3)');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), ',');
    test.equal(result.arity, 2);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, ",:2");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 2);
    test.equal(result.args[0].signature, 'a:1');
    test.equal(result.args[1].signature, 'b:2');
}

exports['parse and structure with three structures'] = function (test) {
    var myparser = parser('a(1),b(2,3),c(4,5,6)');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), ',');
    test.equal(result.arity, 3);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, ",:3");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 3);
    test.equal(result.args[0].signature, 'a:1');
    test.equal(result.args[1].signature, 'b:2');
    test.equal(result.args[2].signature, 'c:3');
}

exports['parse simple rule'] = function (test) {
    var myparser = parser('a :- b');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), ':-');
    test.equal(result.arity, 2);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, ":-:2");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 2);
    test.equal(result.args[0].name(), 'a');
    test.equal(result.args[1].name(), 'b');
}

exports['parse rule with and body'] = function (test) {
    var myparser = parser('a :- b,c');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), ':-');
    test.equal(result.arity, 2);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, ":-:2");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 2);
    test.equal(result.args[0].name(), 'a');
    test.equal(result.args[1].signature, ',:2');
}

exports['parse simple query'] = function (test) {
    var myparser = parser('?- a');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), '?-');
    test.equal(result.arity, 1);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, "?-:1");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 1);
    test.equal(result.args[0].name(), 'a');
}

exports['parse query with and body'] = function (test) {
    var myparser = parser('?- a,b');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), '?-');
    test.equal(result.arity, 1);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, "?-:1");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 1);
    test.equal(result.args[0].signature, ',:2');
	
	test.equal(myparser.parse(), null);
}

exports['parse query with and body and point'] = function (test) {
    var myparser = parser('?- a,b.');
    var result = myparser.parse();
    
    test.ok(result);
    test.ok(result.functor);
    test.equal(result.functor.name(), '?-');
    test.equal(result.arity, 1);
    test.equal(result.nvariables, 0);
    test.equal(result.nanonymous, 0);
    test.equal(result.signature, "?-:1");
    test.ok(result.args);
    test.ok(Array.isArray(result.args));
    test.equal(result.args.length, 1);
    test.equal(result.args[0].signature, ',:2');
	
	test.equal(myparser.parse(), null);
}
