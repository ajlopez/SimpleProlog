
const utils = require("./utils");

function Atom(name) {
    this.name = function () { return name; };

	this.atom = function () { return true; };
	this.variable = function () { return false; };
	this.structure = function () { return false; };
	
	this.asString = function() { return name; };
	
	this.match = function (item, bindings, trying) {
		if (!item)
			return false;
			
		if (typeof item !== 'object')
			return false;
			
		if (utils.isVariable(item))
			return item.match(this, bindings, trying);
			
		if (!utils.isAtom(item))
			return false;
			
		return name === item.name();
	};
}

function atom(name) {
    return new Atom(name);
}

module.exports = atom;

