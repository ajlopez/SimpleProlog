
const lexer = require('../lib/lexer');

const TokenType = lexer.TokenType;
    
exports['next token'] = function (test) {
    const mylexer = lexer('a');
    
    test.ok(mylexer);
    
    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['get bang as atom'] = function (test) {
    const mylexer = lexer('!');
    
    test.ok(mylexer);
    
    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '!');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping percent comment'] = function (test) {
    const mylexer = lexer('a % this is a comment');
    
    test.ok(mylexer);
    
    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping multi line comment'] = function (test) {
    const mylexer = lexer('a /* this is a\ncomment */ b');
    
    test.ok(mylexer);
	
    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, 'b');
    test.equal(token2.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping initial percent comment'] = function (test) {
    const mylexer = lexer('% this is a comment\na');
    
    test.ok(mylexer);
    
    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping initial percent comment ending with carriage return'] = function (test) {
    const mylexer = lexer('% this is a comment\ra');
    
    test.ok(mylexer);
    
    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['get two tokens'] = function (test) {
    const mylexer = lexer('a b');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, 'b');
    test.equal(token2.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['atom with underscore'] = function (test) {
    const mylexer = lexer('parent_child');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'parent_child');
    test.equal(token.type, TokenType.Atom);
    test.equal(mylexer.nextToken(), null);
}

exports['get an integer'] = function (test) {
    const mylexer = lexer('  123  ');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    test.equal(mylexer.nextToken(), null);
}

exports['get an integer and atom'] = function (test) {
    const mylexer = lexer('123bar');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    
    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, 'bar');
    test.equal(token2.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['get ( ) , . as separators'] = function (test) {
    const mylexer = lexer('(),.');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Separator);

    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, ')');
    test.equal(token2.type, TokenType.Separator);

    const token3 = mylexer.nextToken();
    
    test.ok(token3);
    test.equal(token3.value, ',');
    test.equal(token3.type, TokenType.Separator);

    const token4 = mylexer.nextToken();
    
    test.ok(token4);
    test.equal(token4.value, '.');
    test.equal(token4.type, TokenType.Separator);

    test.equal(mylexer.nextToken(), null);
}

exports['get atom, separator, integer, separator'] = function (test) {
    const mylexer = lexer('a(1)');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);

    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, '(');
    test.equal(token2.type, TokenType.Separator);

    const token3 = mylexer.nextToken();
    
    test.ok(token3);
    test.equal(token3.value, '1');
    test.equal(token3.type, TokenType.Integer);

    const token4 = mylexer.nextToken();
    
    test.ok(token4);
    test.equal(token4.value, ')');
    test.equal(token4.type, TokenType.Separator);

    test.equal(mylexer.nextToken(), null);
}

exports['get variable'] = function (test) {
    const mylexer = lexer('X');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'X');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get variable starting with underscore'] = function (test) {
    const mylexer = lexer('_a');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '_a');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get variable starting with underscores'] = function (test) {
    const mylexer = lexer('_a_child');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '_a_child');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get anonymous variable'] = function (test) {
    const mylexer = lexer('_');

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '_');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get quoted atoms'] = function (test) {
    const mylexer = lexer("'X' 'to be or not to be'");

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'X');
    test.equal(token.type, TokenType.Atom);

    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, 'to be or not to be');
    test.equal(token2.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['get unclosed quoted atom'] = function (test) {
    const mylexer = lexer("'X");

    test.throws(
        function() {
            mylexer.nextToken();
        },
        function(err) {
            if (err === "unclosed quoted atom")
                return true;
        }
    );
}

exports['get :- as an atom'] = function (test) {
    const mylexer = lexer(":-")

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ':-');
    test.equal(token.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['get ?- as an atom'] = function (test) {
    const mylexer = lexer("?-")

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '?-');
    test.equal(token.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['first rule with atoms'] = function (test) {
    const mylexer = lexer("a:-b");

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);

    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, ':-');
    test.equal(token2.type, TokenType.Atom);

    const token3 = mylexer.nextToken();
    
    test.ok(token3);
    test.equal(token3.value, 'b');
    test.equal(token3.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['first rule with variables'] = function (test) {
    const mylexer = lexer("A:-B");

    const token = mylexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'A');
    test.equal(token.type, TokenType.Variable);

    const token2 = mylexer.nextToken();
    
    test.ok(token2);
    test.equal(token2.value, ':-');
    test.equal(token2.type, TokenType.Atom);

    const token3 = mylexer.nextToken();
    
    test.ok(token3);
    test.equal(token3.value, 'B');
    test.equal(token3.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

