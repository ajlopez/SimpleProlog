
var atom = require('./atom'),
    variable = require('./variable'),
    structure = require('./structure'),
    lexer = require('./lexer');

var TokenType = lexer.TokenType;

function Parser(text) {
    var mylexer = lexer(text);
    var tokens = [];
    
    this.parse = function () {
        if (tryParseToken('?-', TokenType.Atom)) {
            return structure(atom('?-'), [this.parse()]);
        }
        
        var struct = parseStructure();
        
        if (struct == null)
            return null;
            
        if (tryParseToken(':-', TokenType.Atom)) {
            var body = this.parse();
            return structure(atom(':-'), [struct, body]);
        }
        
        if (!tryParseToken(",", TokenType.Separator))
            return struct;
        
        var structures = [struct];
        var stru;
        
        while (stru = parseStructure()) {
            structures.push(stru);
            if (!tryParseToken(",", TokenType.Separator))
                break;
        }
        
        return structure(atom(','), structures);
    }

    function parseStructure() {
        var element = parseElement();
        
        if (element == null)
            return null;
        
        if (!tryParseToken("(", TokenType.Separator))
            return element;
        
        var elements = [];
        var elem;
        
        while (elem = parseElement()) {
            elements.push(elem);
            if (!tryParseToken(",", TokenType.Separator))
                break;
        }
            
        parseToken(")", TokenType.Separator);
        
        return structure(element, elements);
    }
    
    function parseElement() {
        var token = nextToken();
        
        if (!token)
            return null;
            
        var result;
            
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
        var token = nextToken();
        
        if (token == null)
            return false;
            
        if (token.value === value && token.type === type)
            return true;
            
        pushToken(token);
        
        return false;
    }
    
    function parseToken(value, type) {
        var token = nextToken();
        
        if (token == null || token.value !== value || token.type !== type)
            throw "error: expected '" + value + "'";
    }
}

function parser(text) {
    return new Parser(text);
}

module.exports = parser;
