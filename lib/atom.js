
function Atom(name) {
    this.name = name;
}

Atom.prototype.asString = function () {
    return this.name;
};

function atom(name) {
    return new Atom(name);
}

module.exports = atom;

