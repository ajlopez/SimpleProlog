const gepars = require('gepars');

const lexers = require('./lexers');
const atom = require('./atom');
const variable = require('./variable');
const structure = require('./structure');

const pdef = gepars.definition();

pdef.define('atom', 'atom:', function (value) { return atom(value); });
pdef.define('variable', 'variable:', function (value) { return variable(value); });
pdef.define('integer', 'integer:', function (value) { return parseInt(value); });
pdef.define('structure', [ 'atom', 'separator:(', 'separator:)' ], function (values) { return structure(values[0], []); });

function createParser(text) {
    const lexer = lexers.lexer(text);   
    return pdef.parser(lexer);
}

module.exports = {
    parser: createParser
}

