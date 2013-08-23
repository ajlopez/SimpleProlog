
var atom = require('./atom'),
    variable = require('./variable'),
    lexer = require('./lexer');

var TokenType = lexer.TokenType;

function Parser(text) {
    var mylexer = lexer(text);
    
    this.parse = function () {
        var token = mylexer.nextToken();
        
        if (!token)
            return null;
            
        if (token.type == TokenType.Variable)
            return variable(token.value);
        
        return atom(token.value);
    }
}

function parser(text) {
    return new Parser(text);
}

module.exports = parser;
