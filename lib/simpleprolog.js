
const base = require('./base');
const atom = require('./atom');
const structure = require('./structure');
const variable = require('./variable');
const parser = require('./parsers').parser;

function process(text, base) {
    const pars = parser(text);
    
    for (let fact = pars.parse('fact'); fact; fact = pars.parse('fact'))
        base.assert(fact);
}

module.exports = {
    base: base,
    atom: atom,
    structure: structure,
    variable: variable,
    parser: parser,
    
    process: process
};

