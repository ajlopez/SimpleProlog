
var lexer = require('../lib/lexer'),
    assert = require('assert');

var TokenType = lexer.TokenType;
    
// create lexer
    
var mylexer = lexer('a');
assert.ok(mylexer);

// next token

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);

// then next token is null

assert.equal(mylexer.nextToken(), null);

// get two tokens
    
var mylexer = lexer('a b');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);
token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'b');
assert.equal(token.type, TokenType.Atom);
assert.equal(mylexer.nextToken(), null);

// atom with underscore

var mylexer = lexer('parent_child');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'parent_child');
assert.equal(token.type, TokenType.Atom);
assert.equal(mylexer.nextToken(), null);

// get an integer
    
var mylexer = lexer('  123  ');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '123');
assert.equal(token.type, TokenType.Integer);
assert.equal(mylexer.nextToken(), null);

// get an integer and atom
    
var mylexer = lexer('123bar');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '123');
assert.equal(token.type, TokenType.Integer);
token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'bar');
assert.equal(token.type, TokenType.Atom);
assert.equal(mylexer.nextToken(), null);

// get ( ) , . as separators
    
var mylexer = lexer('(),.');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '(');
assert.equal(token.type, TokenType.Separator);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, ')');
assert.equal(token.type, TokenType.Separator);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, ',');
assert.equal(token.type, TokenType.Separator);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '.');
assert.equal(token.type, TokenType.Separator);

assert.equal(mylexer.nextToken(), null);

// get atom, separator, integer, separator

var mylexer = lexer('a(1)');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '(');
assert.equal(token.type, TokenType.Separator);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '1');
assert.equal(token.type, TokenType.Integer);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, ')');
assert.equal(token.type, TokenType.Separator);

assert.equal(mylexer.nextToken(), null);

// get variable

var mylexer = lexer('X');

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'X');
assert.equal(token.type, TokenType.Variable);

assert.equal(mylexer.nextToken(), null);

// get quoted atoms

var mylexer = lexer("'X' 'to be or not to be'");

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'X');
assert.equal(token.type, TokenType.Atom);

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'to be or not to be');
assert.equal(token.type, TokenType.Atom);

assert.equal(mylexer.nextToken(), null);

// get unclosed quoted atom

var mylexer = lexer("'X");

assert.throws(
    function() {
        mylexer.nextToken();
    },
    function(err) {
        if (err === "unclosed quoted atom")
            return true;
    }
);

// get :- as an atom

var mylexer = lexer(":-")

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, ':-');
assert.equal(token.type, TokenType.Atom);

assert.equal(mylexer.nextToken(), null);

// get ?- as an atom

var mylexer = lexer("?-")

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, '?-');
assert.equal(token.type, TokenType.Atom);

assert.equal(mylexer.nextToken(), null);

// first rule

var mylexer = lexer("a:-b");

var token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, ':-');
assert.equal(token.type, TokenType.Atom);

token = mylexer.nextToken();
assert.ok(token);
assert.equal(token.value, 'b');
assert.equal(token.type, TokenType.Atom);

assert.equal(mylexer.nextToken(), null);
