
var TokenType = { Name: 1 };

function Lexer(text) {
    var position = 0;
    var length = text.length;
    
    this.nextToken = function() {
        var result = '';
        
        while (position < length && text[position] <= ' ')
            position++;
        
        while (position < length && text[position] > ' ')
            result += text[position++];
            
        if (result == '')
            return null;
            
        var token = { value: result, type: TokenType.Name };
        
        return token;
    }
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

