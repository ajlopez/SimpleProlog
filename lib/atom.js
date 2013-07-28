
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

atom.sameAtoms = function (item1, item2) {
    if (item1 instanceof Atom && item2 instanceof Atom && item1.name == item2.name)
        return true;
    
    return false;
}

module.exports = atom;

