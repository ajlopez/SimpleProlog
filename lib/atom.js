
function Atom(name) {
    this.name = function() { return name; };
	
	this.variable = function() { return false; };
	
	this.asString = function() { return name; };
	
	this.match = function (item, bindings, trying) {
		if (!item)
			return false;
			
		if (typeof item !== 'object')
			return false;
			
		if (item.variable && item.variable())
			return item.match(this, bindings, trying);
			
		if (!(item instanceof Atom))
			return false;
			
		return name === item.name();
	};
}

function atom(name) {
    return new Atom(name);
}

module.exports = atom;

