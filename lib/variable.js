
const atom = require('./atom');
const utils = require('./utils');

function Variable(name, offset) {
    this.name = function() { return name; };
	
	this.atom = function() { return false; };
	this.variable = function() { return true; };
	this.structure = function() { return false; };
	
    this.asString = function() { return name; };
	
	this.offset = function(newoffset) { 
		if (newoffset != null)
			offset = newoffset;
		
		return offset;
	};
	
	this.add = function (bindings) {
		offset = bindings.add(null);
	}
    
	this.match = function (item, bindings, trying) {
		if (offset == null)
			offset = bindings.add(null);
        
        let newtrying;
		
		if (utils.isVariable(item)) {
            const itoffset = item.offset();
            
			if (itoffset == null)
				item.add(bindings);
			
			if (offset === itoffset)
				return true;
				
			if (tried(trying, offset, itoffset))
				return true;
				
			newtrying = addTry(trying, offset, itoffset);
		}
		else
			newtrying = trying;
			
		const value = bindings.get(offset);
		
		if (value != null) {
			if (value.match)
				return value.match(item, bindings, newtrying);
				
			if (utils.isVariable(item))
				return item.match(value, bindings, newtrying);
				
			if (value === item)
				return true;
				
			return false;
		}
		
		if (utils.isVariable(item)) {
			if (item.offset() == null)
				item.add(bindings);
				
			const value2 = bindings.get(item.offset());
			
			if (value2 != null)
				return this.match(value2, bindings, newtrying);
		}
		
		if (utils.isVariable(item) && item.offset() > offset)
			bindings.set(item.offset(), this);
		else
			bindings.set(offset, item);
			
		return true;
	}
}

function variable(name, offset) {
    return new Variable(name, offset);
}

function tried(trying, offset1, offset2) {
    if (!trying)
        return false;
        
    const l = trying.length;
        
    for (let k = 0; k < l; k++) {
        const trypair = trying[k];
        
        if (trypair[0] === offset1 && trypair[1] === offset2)
            return true;
        
        if (trypair[1] === offset1 && trypair[0] === offset2)
            return true;
    }
    
    return false;
}

function addTry(trying, offset1, offset2) {
    if (!trying || trying.length === 0)
        return [[offset1, offset2]];
        
    const newtrying = trying.slice();
    newtrying.push([offset, offset2]);
    
    return newtrying;
}

module.exports = variable;

