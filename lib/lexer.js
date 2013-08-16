
var TokenType = { Atom: 1, Variable: 2, Integer: 3, Separator: 4 };

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
        
        if (isSeparator(ch))
            return { value: ch, type: TokenType.Separator };
        
        if (isDigit(ch))
            return nextNumber(ch);
            
        if (isUpperCaseLetter(ch))
            return nextVariable(ch);
        
        return nextAtom(ch);
    }
    
    function nextNumber(ch) {
        var result = ch;
        
        while (position < length && isDigit(text[position]))
            result += text[position++];
            
        return { type: TokenType.Integer, value: result };
    }
    
    function nextAtom(ch) {
        var result = ch;
        
        while (position < length && !isWhiteSpace(text[position]) && !isSeparator(text[position]))
            result += text[position++];
            
        return { type: TokenType.Atom, value: result };
    }
    
    function nextVariable(ch) {
        var result = ch;
        
        while (position < length && !isWhiteSpace(text[position]) && !isSeparator(text[position]))
            result += text[position++];
            
        return { type: TokenType.Variable, value: result };
    }
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function isWhiteSpace(ch) {
    return ch <= ' ';
}

function isSeparator(ch) {
    return separators.indexOf(ch) >= 0;
}

function isUpperCaseLetter(ch) {
    return ch >= 'A' && ch <= 'Z';
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

