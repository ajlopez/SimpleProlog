
var lexer = require('../lib/lexer');

var TokenType = lexer.TokenType;
    
exports['next token'] = function (test) {
    var mylexer = lexer('a');
    test.ok(mylexer);
    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping percent comment'] = function (test) {
    var mylexer = lexer('a % this is a comment');
    test.ok(mylexer);
    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping initial percent comment'] = function (test) {
    var mylexer = lexer('% this is a comment\na');
    test.ok(mylexer);
    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['next token skipping initial percent comment ending with carriage return'] = function (test) {
    var mylexer = lexer('% this is a comment\ra');
    test.ok(mylexer);
    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(mylexer.nextToken(), null);
}

exports['get two tokens'] = function (test) {
    var mylexer = lexer('a b');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);
    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'b');
    test.equal(token.type, TokenType.Atom);
    test.equal(mylexer.nextToken(), null);
}

exports['atom with underscore'] = function (test) {
    var mylexer = lexer('parent_child');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'parent_child');
    test.equal(token.type, TokenType.Atom);
    test.equal(mylexer.nextToken(), null);
}

exports['get an integer'] = function (test) {
    var mylexer = lexer('  123  ');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    test.equal(mylexer.nextToken(), null);
}

exports['get an integer and atom'] = function (test) {
    var mylexer = lexer('123bar');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Atom);
    test.equal(mylexer.nextToken(), null);
}

exports['get ( ) , . as separators'] = function (test) {
    var mylexer = lexer('(),.');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Separator);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, ')');
    test.equal(token.type, TokenType.Separator);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, ',');
    test.equal(token.type, TokenType.Separator);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '.');
    test.equal(token.type, TokenType.Separator);

    test.equal(mylexer.nextToken(), null);
}

exports['get atom, separator, integer, separator'] = function (test) {
    var mylexer = lexer('a(1)');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '(');
    test.equal(token.type, TokenType.Separator);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '1');
    test.equal(token.type, TokenType.Integer);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, ')');
    test.equal(token.type, TokenType.Separator);

    test.equal(mylexer.nextToken(), null);
}

exports['get variable'] = function (test) {
    var mylexer = lexer('X');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'X');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get variable starting with underscore'] = function (test) {
    var mylexer = lexer('_a');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '_a');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get variable starting with underscores'] = function (test) {
    var mylexer = lexer('_a_child');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '_a_child');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get anonymous variable'] = function (test) {
    var mylexer = lexer('_');

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '_');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

exports['get quoted atoms'] = function (test) {
    var mylexer = lexer("'X' 'to be or not to be'");

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'X');
    test.equal(token.type, TokenType.Atom);

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'to be or not to be');
    test.equal(token.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['get unclosed quoted atom'] = function (test) {
    var mylexer = lexer("'X");

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
    var mylexer = lexer(":-")

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, ':-');
    test.equal(token.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['get ?- as an atom'] = function (test) {
    var mylexer = lexer("?-")

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, '?-');
    test.equal(token.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['first rule with atoms'] = function (test) {
    var mylexer = lexer("a:-b");

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Atom);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, ':-');
    test.equal(token.type, TokenType.Atom);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'b');
    test.equal(token.type, TokenType.Atom);

    test.equal(mylexer.nextToken(), null);
}

exports['first rule with variables'] = function (test) {
    var mylexer = lexer("A:-B");

    var token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'A');
    test.equal(token.type, TokenType.Variable);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, ':-');
    test.equal(token.type, TokenType.Atom);

    token = mylexer.nextToken();
    test.ok(token);
    test.equal(token.value, 'B');
    test.equal(token.type, TokenType.Variable);

    test.equal(mylexer.nextToken(), null);
}

