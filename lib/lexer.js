
const TokenType = { Atom: 1, Variable: 2, Integer: 3, Separator: 4 };

const separators = "(),.";

function Lexer(text) {
    let position = 0;
    const length = text ? text.length : 0;
    
    this.nextToken = function() {
		skipWhiteSpaces();
            
        if (position >= length)
            return null;
            
        const ch = text[position++];
        
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
            
            if (position >= length)
                return;

            const ch = text[position];
            
			if (ch === '%') {
				while (position < length && text[position] != '\n' && text[position] != '\r')
					position++;
				
				continue;
			}
			
			if (ch === '/' && text[position + 1] === '*') {
				while (position < length && !(text[position] === '*' && text[position + 1] === '/'))
					position++;
				
				if (position < length)
					position += 2;
				
				continue;
			}
			
			return;
		}
	}
    
    function nextNumber(ch) {
        let result = ch;
        
        while (position < length && isDigit(text[position]))
            result += text[position++];
            
        return { type: TokenType.Integer, value: result };
    }
    
    function nextAtom(ch) {
        let result = ch;
        
        while (position < length && isNameCharacter(text[position]))
            result += text[position++];
            
        return { type: TokenType.Atom, value: result };
    }
    
    function nextSignAtom(ch) {
        let result = ch;
        
        while (position < length && isSign(text[position]))
            result += text[position++];
            
        return { type: TokenType.Atom, value: result };
    }
    
    function nextQuotedAtom() {
        let result = '';
        
        while (position < length && text[position] != "'")
            result += text[position++];
            
        if (position >= length)
            throw "unclosed quoted atom";
            
        position++;
        
        return { type: TokenType.Atom, value:  result };
    }
    
    function nextVariable(ch) {
        let result = ch;
        
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

