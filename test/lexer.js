
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
assert.equal(token.type, TokenType.Name);

