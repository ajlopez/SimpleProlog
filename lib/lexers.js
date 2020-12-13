const gelex = require('gelex');
const ldef = gelex.definition();

const TokenType = { Atom: 'atom', Variable: 'variable', Integer: 'integer', Delimiter: 'delimiter', Separator: 'separator' };

ldef.define(TokenType.Atom  , '[a-z][a-zA-Z0-9_]*');
ldef.define(TokenType.Atom  , '!');
ldef.define(TokenType.Atom  , '?-');
ldef.define(TokenType.Atom  , ':-');
ldef.define(TokenType.Variable  , '[A-Z_][a-zA-Z0-9_]*');
ldef.define(TokenType.Integer, '[0-9][0-9]*');
ldef.define(TokenType.Separator, '(),.'.split(''));
ldef.defineText(TokenType.Atom, "'", "'");

ldef.defineComment('/*', '*/');
ldef.defineComment('%');

function createLexer(text) {
    return ldef.lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}

