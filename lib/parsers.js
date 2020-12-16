const gepars = require('gepars');

const lexers = require('./lexers');
const atom = require('./atom');
const variable = require('./variable');

const pdef = gepars.definition();

pdef.define('atom', 'atom:', function (value) { return atom(value); });
pdef.define('variable', 'variable:', function (value) { return variable(value); });

function createParser(text) {
    const lexer = lexers.lexer(text);   
    return pdef.parser(lexer);
}

module.exports = {
    parser: createParser
}

