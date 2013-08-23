
var atom = require('./atom'),
    lexer = require('./lexer');

function Parser(text) {
    var mylexer = lexer(text);
    
    this.parse = function () {
        var token = mylexer.nextToken();
        
        if (!token)
            return null;
        
        return atom(token.value);
    }
}

function parser(text) {
    return new Parser(text);
}

module.exports = parser;
