
var TokenType = { Atom: 1, Variable: 2, Integer: 3, Separator: 4 };

var separators = "(),.";

function Lexer(text) {
    var position = 0;
    var length = text ? text.length : 0;
    
    this.nextToken = function() {
        var result = '';

		skipWhiteSpaces();
            
        if (position >= length)
            return null;
            
        var ch = text[position++];
        
        if (isSeparator(ch))
            return { value: ch, type: TokenType.Separator };
        
        if (isDigit(ch))
            return nextNumber(ch);
            
        if (isUpperCaseLetter(ch) || ch === '_')
            return nextVariable(ch);
            
        if (ch === "'")
            return nextQuotedAtom();
        
        if (isLetter(ch))
            return nextAtom(ch);
            
        return nextSignAtom(ch);
    }
	
	function skipWhiteSpaces() {
		while (true) {
			while (position < length && isWhiteSpace(text[position]))
				position++;
			
			if (position >= length || text[position] != '%')
				return;
			
			while (position < length)
				position++;
		}
	}
    
    function nextNumber(ch) {
        var result = ch;
        
        while (position < length && isDigit(text[position]))
            result += text[position++];
            
        return { type: TokenType.Integer, value: result };
    }
    
    function nextAtom(ch) {
        var result = ch;
        
        while (position < length && isNameCharacter(text[position]))
            result += text[position++];
            
        return { type: TokenType.Atom, value: result };
    }
    
    function nextSignAtom(ch) {
        var result = ch;
        
        while (position < length && isSign(text[position]))
            result += text[position++];
            
        return { type: TokenType.Atom, value: result };
    }
    
    function nextQuotedAtom() {
        var result = '';
        
        while (position < length && text[position] != "'")
            result += text[position++];
            
        if (position >= length)
            throw "unclosed quoted atom";
            
        position++;
        
        return { type: TokenType.Atom, value:  result };
    }
    
    function nextVariable(ch) {
        var result = ch;
        
        while (position < length && isNameCharacter(text[position]))
            result += text[position++];
            
        return { type: TokenType.Variable, value: result };
    }
}

function isNameCharacter(ch)
{
    return ch === '_' || isLetter(ch) || isDigit(ch);
}

function isSign(ch) {
    return !isWhiteSpace(ch) && !isSeparator(ch) && !isLetter(ch) && !isDigit(ch);
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

function isLetter(ch) {
    return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
}

function lexer(text) {
    return new Lexer(text);
}

lexer.TokenType = TokenType;

module.exports = lexer;

