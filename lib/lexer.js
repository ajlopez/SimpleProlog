
var TokenType = { Name: 1 };

function Lexer(text) {
    var position = 0;
    var length = text.length;
    
    this.nextToken = function() {
        if (position >= length)
            return null;
            
        var token = { value: text, type: TokenType.Name };
        
        position = length;
        
        return token;
    }
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

