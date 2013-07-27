
function Atom(name) {
    this.name = name;
}

Atom.prototype.asString = function () {
    return this.name;
};

Atom.prototype.match = function (item) {
    if (!item)
        return false;
        
    if (typeof item !== 'object')
        return false;
        
    if (!(item instanceof Atom))
        return false;
        
    return this.name === item.name;
};

function atom(name) {
    return new Atom(name);
}

module.exports = atom;

