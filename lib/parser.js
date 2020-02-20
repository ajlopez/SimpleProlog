
const atom = require('./atom');
const variable = require('./variable');
const structure = require('./structure');
const lexer = require('./lexer');

const TokenType = lexer.TokenType;

function Parser(text) {
    const mylexer = lexer(text);
    const tokens = [];
    
    this.parse = function () {
        if (tryParseToken('?-', TokenType.Atom))
            return structure(atom('?-'), [this.parse()]);
        
        const struct = parseStructure();
        
        if (struct == null)
            return null;
            
        if (tryParseToken(':-', TokenType.Atom)) {
            const body = this.parse();
            return structure(atom(':-'), [struct, body]);
        }
        
        if (!tryParseToken(",", TokenType.Separator))
            return struct;
        
        const structures = [struct];
        let stru;
        
        while (stru = parseStructure()) {
            structures.push(stru);
            
            if (!tryParseToken(",", TokenType.Separator))
                break;
        }
        
        return structure(atom(','), structures);
    }

    function parseStructure() {
        const element = parseElement();
        
        if (element == null)
            return null;
        
        if (!tryParseToken("(", TokenType.Separator))
            return element;
        
        const elements = [];
        let elem;
        
        while (elem = parseElement()) {
            elements.push(elem);
            
            if (!tryParseToken(",", TokenType.Separator))
                break;
        }
            
        parseToken(")", TokenType.Separator);
        
        return structure(element, elements);
    }
    
    function parseElement() {
        const token = nextToken();
        
        if (!token)
            return null;
            
        if (token.type === TokenType.Variable)
            return variable(token.value);
            
        if (token.type === TokenType.Atom)
            return atom(token.value);
        
        if (token.type === TokenType.Integer)
            return parseInt(token.value);
        
        pushToken(token);
        
        return null;
    }
    
    function pushToken(token) {
        tokens.push(token);
    }
    
    function nextToken() {
        if (tokens.length > 0)
            return tokens.pop();
            
        return mylexer.nextToken();
    }
    
    function tryParseToken(value, type) {
        const token = nextToken();
        
        if (token == null)
            return false;
            
        if (token.value === value && token.type === type)
            return true;
            
        pushToken(token);
        
        return false;
    }
    
    function parseToken(value, type) {
        const token = nextToken();
        
        if (token == null || token.value !== value || token.type !== type)
            throw "error: expected '" + value + "'";
    }
}

function parser(text) {
    return new Parser(text);
}

module.exports = parser;
