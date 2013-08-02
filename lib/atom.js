
function Atom(name) {
    this.name = name;
}

Atom.prototype.asString = function () {
    return this.name;
};

Atom.prototype.match = function (item, bindings) {
    if (!item)
        return false;
        
    if (typeof item !== 'object')
        return false;
        
    if (item.variable)
        return item.match(this, bindings);
        
    if (!(item instanceof Atom))
        return false;
        
    return this.name === item.name;
};

function atom(name) {
    return new Atom(name);
}

module.exports = atom;

