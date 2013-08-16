
var TokenType = { Name: 1, Integer: 2 };

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
        
        if (result[0] >= '0' && result[0] <= '9')
            return { value: result, type: TokenType.Integer };
        else    
            return { value: result, type: TokenType.Name };
    }
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

