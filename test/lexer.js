
var lexer = require('../lib/lexer'),
    assert = require('assert');

var TokenType = lexer.TokenType;
    
// create lexer
    
var lexer1 = lexer('a');
assert.ok(lexer1);

// next token

var token = lexer1.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);

// then next token is null

assert.equal(lexer1.nextToken(), null);

// get two tokens
    
var lexer2 = lexer('a b');

var token = lexer2.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);
token = lexer2.nextToken();
assert.ok(token);
assert.equal(token.value, 'b');
assert.equal(token.type, TokenType.Atom);
assert.equal(lexer2.nextToken(), null);

// get an integer
    
var lexer3 = lexer('  123  ');

var token = lexer3.nextToken();
assert.ok(token);
assert.equal(token.value, '123');
assert.equal(token.type, TokenType.Integer);
assert.equal(lexer3.nextToken(), null);

// get an integer and atom
    
var lexer4 = lexer('123bar');

var token = lexer4.nextToken();
assert.ok(token);
assert.equal(token.value, '123');
assert.equal(token.type, TokenType.Integer);
token = lexer4.nextToken();
assert.ok(token);
assert.equal(token.value, 'bar');
assert.equal(token.type, TokenType.Atom);
assert.equal(lexer4.nextToken(), null);

// get ( ) , . as separators
    
var lexer5 = lexer('(),.');

var token = lexer5.nextToken();
assert.ok(token);
assert.equal(token.value, '(');
assert.equal(token.type, TokenType.Separator);

token = lexer5.nextToken();
assert.ok(token);
assert.equal(token.value, ')');
assert.equal(token.type, TokenType.Separator);

token = lexer5.nextToken();
assert.ok(token);
assert.equal(token.value, ',');
assert.equal(token.type, TokenType.Separator);

token = lexer5.nextToken();
assert.ok(token);
assert.equal(token.value, '.');
assert.equal(token.type, TokenType.Separator);

assert.equal(lexer5.nextToken(), null);

// get atom, separator, integer, separator

var lexer6 = lexer('a(1)');

var token = lexer6.nextToken();
assert.ok(token);
assert.equal(token.value, 'a');
assert.equal(token.type, TokenType.Atom);

token = lexer6.nextToken();
assert.ok(token);
assert.equal(token.value, '(');
assert.equal(token.type, TokenType.Separator);

token = lexer6.nextToken();
assert.ok(token);
assert.equal(token.value, '1');
assert.equal(token.type, TokenType.Integer);

token = lexer6.nextToken();
assert.ok(token);
assert.equal(token.value, ')');
assert.equal(token.type, TokenType.Separator);

assert.equal(lexer6.nextToken(), null);

// get variable

var lexer7 = lexer('X');

var token = lexer7.nextToken();
assert.ok(token);
assert.equal(token.value, 'X');
assert.equal(token.type, TokenType.Variable);

assert.equal(lexer7.nextToken(), null);

