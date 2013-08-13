
var TokenType = { Name: 1 };

function Lexer(text) {
    this.nextToken = function() {
        return { value: text, type: TokenType.Name };
    }
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

