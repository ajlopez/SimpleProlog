
var TokenType = { Name: 1, Integer: 2, Separator: 3 };

var separators = "(),.";

function Lexer(text) {
    var position = 0;
    var length = text.length;
    
    this.nextToken = function() {
        var result = '';
        
        while (position < length && isWhiteSpace(text[position]))
            position++;
            
        if (position >= length)
            return null;
            
        var ch = text[position++];
        
        if (separators.indexOf(ch) >= 0)
            return { value: ch, type: TokenType.Separator };
        
        if (isDigit(ch))
            return nextNumber(ch);
        
        return nextName(ch);
    }
    
    function nextNumber(ch) {
        var result = ch;
        
        while (position < length && isDigit(text[position]))
            result += text[position++];
            
        return { type: TokenType.Integer, value: result };
    }
    
    function nextName(ch) {
        var result = ch;
        
        while (position < length && !isWhiteSpace(text[position]))
            result += text[position++];
            
        return { type: TokenType.Name, value: result };
    }
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function isWhiteSpace(ch) {
    return ch <= ' ';
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

