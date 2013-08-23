
var atom = require('./atom');

function Parser(text) {
    this.parse = function () {
        return atom(text);
    }
}

function parser(text) {
    return new Parser(text);
}

module.exports = parser;
