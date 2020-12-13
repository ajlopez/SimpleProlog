
const lexers = require('../lib/lexers');

const TokenType = lexers.TokenType;
    
exports['next token'] = function (test) {
    const lexer = lexers.lexer('a');
    
    test.ok(lexer);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['get bang as atom'] = function (test) {
    const lexer = lexers.lexer('!');
    
    test.ok(lexer);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '!');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['next token skipping percent comment'] = function (test) {
    const lexer = lexers.lexer('a % this is a comment');
    
    test.ok(lexer);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['next token skipping multi line comment'] = function (test) {
    const lexer = lexers.lexer('a /* this is a\ncomment */ b');
    
    test.ok(lexer);
	
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, 'b');
    test.equal(token2.type, TokenType.Atom);

    test.equal(lexer.next(), null);
}

exports['next token skipping initial percent comment'] = function (test) {
    const lexer = lexers.lexer('% this is a comment\na');
    
    test.ok(lexer);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['next token skipping initial percent comment ending with carriage return'] = function (test) {
    const lexer = lexers.lexer('% this is a comment\ra');
    
    test.ok(lexer);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['get two tokens'] = function (test) {
    const lexer = lexers.lexer('a b');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, 'b');
    test.equal(token2.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['atom with underscore'] = function (test) {
    const lexer = lexers.lexer('parent_child');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'parent_child');
    test.equal(token.type, TokenType.Atom);
    test.equal(lexer.next(), null);
}

exports['get an integer'] = function (test) {
    const lexer = lexers.lexer('  123  ');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    test.equal(lexer.next(), null);
}

exports['get an integer and atom'] = function (test) {
    const lexer = lexers.lexer('123bar');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, 'bar');
    test.equal(token2.type, TokenType.Atom);
    
    test.equal(lexer.next(), null);
}

exports['get ( ) , . as separators'] = function (test) {
    const lexer = lexers.lexer('(),.');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Separator);

    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, ')');
    test.equal(token2.type, TokenType.Separator);

    const token3 = lexer.next();
    
    test.ok(token3);
    test.equal(token3.value, ',');
    test.equal(token3.type, TokenType.Separator);

    const token4 = lexer.next();
    
    test.ok(token4);
    test.equal(token4.value, '.');
    test.equal(token4.type, TokenType.Separator);

    test.equal(lexer.next(), null);
}

exports['get atom, separator, integer, separator'] = function (test) {
    const lexer = lexers.lexer('a(1)');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);

    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, '(');
    test.equal(token2.type, TokenType.Separator);

    const token3 = lexer.next();
    
    test.ok(token3);
    test.equal(token3.value, '1');
    test.equal(token3.type, TokenType.Integer);

    const token4 = lexer.next();
    
    test.ok(token4);
    test.equal(token4.value, ')');
    test.equal(token4.type, TokenType.Separator);

    test.equal(lexer.next(), null);
}

exports['get variable'] = function (test) {
    const lexer = lexers.lexer('X');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'X');
    test.equal(token.type, TokenType.Variable);

    test.equal(lexer.next(), null);
}

exports['get variable starting with underscore'] = function (test) {
    const lexer = lexers.lexer('_a');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '_a');
    test.equal(token.type, TokenType.Variable);

    test.equal(lexer.next(), null);
}

exports['get variable starting with underscores'] = function (test) {
    const lexer = lexers.lexer('_a_child');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '_a_child');
    test.equal(token.type, TokenType.Variable);

    test.equal(lexer.next(), null);
}

exports['get anonymous variable'] = function (test) {
    const lexer = lexers.lexer('_');

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '_');
    test.equal(token.type, TokenType.Variable);

    test.equal(lexer.next(), null);
}

exports['get quoted atoms'] = function (test) {
    const lexer = lexers.lexer("'X' 'to be or not to be'");

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'X');
    test.equal(token.type, TokenType.Atom);

    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, 'to be or not to be');
    test.equal(token2.type, TokenType.Atom);

    test.equal(lexer.next(), null);
}

// TODO
/*
exports['get unclosed quoted atom'] = function (test) {
    const lexer = lexers.lexer("'X");
    
    test.ok(!lexer.next());
}
*/

exports['get :- as an atom'] = function (test) {
    const lexer = lexers.lexer(":-")

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ':-');
    test.equal(token.type, TokenType.Atom);

    test.equal(lexer.next(), null);
}

exports['get ?- as an atom'] = function (test) {
    const lexer = lexers.lexer("?-")

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '?-');
    test.equal(token.type, TokenType.Atom);

    test.equal(lexer.next(), null);
}

exports['first rule with atoms'] = function (test) {
    const lexer = lexers.lexer("a:-b");

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);

    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, ':-');
    test.equal(token2.type, TokenType.Atom);

    const token3 = lexer.next();
    
    test.ok(token3);
    test.equal(token3.value, 'b');
    test.equal(token3.type, TokenType.Atom);

    test.equal(lexer.next(), null);
}

exports['first rule with variables'] = function (test) {
    const lexer = lexers.lexer("A:-B");

    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'A');
    test.equal(token.type, TokenType.Variable);

    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, ':-');
    test.equal(token2.type, TokenType.Atom);

    const token3 = lexer.next();
    
    test.ok(token3);
    test.equal(token3.value, 'B');
    test.equal(token3.type, TokenType.Variable);

    test.equal(lexer.next(), null);
}

