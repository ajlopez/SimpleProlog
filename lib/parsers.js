const gepars = require('gepars');

const lexers = require('./lexers');
const atom = require('./atom');
const variable = require('./variable');
const structure = require('./structure');

const pdef = gepars.definition();

pdef.define('atom', 'atom:', function (value) { return atom(value); });
pdef.define('variable', 'variable:', function (value) { return variable(value); });
pdef.define('integer', 'integer:', function (value) { return parseInt(value); });
pdef.define('structure', [ 'atom', 'separator:(', 'element-list', 'separator:)' ], function (values) { return structure(values[0], values[2]); });

pdef.define('element-list', [ 'element', 'separator:,', 'element-list' ], function (values) { values[2].unshift(values[0]); return values[2]; });
pdef.define('element-list', [ 'element', '!', 'separator:)' ], function (values) { return [ values[0] ]; });
pdef.define('element-list', [ 'element', '!', 'null' ], function (values) { return [ values[0] ]; });
pdef.define('element-list', [ '!', 'separator:)' ], function (values) { return []; });
pdef.define('element-list', [ '!', 'null' ], function (values) { return []; });

pdef.define('element', 'structure');
pdef.define('element', 'integer');
pdef.define('element', 'atom');
pdef.define('element', 'variable');

pdef.define('fact', [ 'structure', 'separator:.' ], function (values) { return values[0]; });

pdef.define('rule', [ 'structure', 'atom::-', 'element-list' ], function (values) { values[2].unshift(values[0]); return structure(atom(values[1]), values[2]); });

function createParser(text) {
    const lexer = lexers.lexer(text);   
    return pdef.parser(lexer);
}

module.exports = {
    parser: createParser
}

