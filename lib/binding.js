
function Binding(size) {
    var values = [];
    var bindings = [];
    var nbindings = 0;
    
    this.current = function () {
        return { size: size, nbindings: nbindings }
    };
    
    this.get = function (offset) {
        if (offset < 0 || offset >= size)
            throw new Error("invalid offset in binding");
            
        var value = values[offset];
        
        if (value === undefined)
            return null;

        return value;
    };
    
    this.set = function (offset, value) {
        if (offset < 0 || offset >= size)
            throw new Error("invalid offset in binding");
            
        values[offset] = value;
        bindings[nbindings++] = { offset: offset, value: value };
    }
	
	this.add = function (value) {
		var offset = values.length;
		
		values[offset] = value;
        bindings[nbindings++] = { offset: offset, value: value };
		
		if (values.length > size)
			size = values.length;

		return offset;
	}
    
    this.grow = function (increment) {
        for (var k = 0; k < increment; k++)
            values[k + size] = null;
            
        size += increment;
    }
    
    this.reset = function (newstatus) {
        if (newstatus.size < 0 || newstatus.size > size)
            throw new Error("invalid reset argument");

        if (newstatus.nbindings < 0 || newstatus.nbindings > nbindings)
            throw new Error("invalid reset argument");
            
        size = newstatus.size;
        
        for (var k = newstatus.nbindings; k < nbindings; k++) {
            if (bindings[k] && bindings[k].offset < size)
                values[bindings[k].offset] = null;
		}
                
        nbindings = newstatus.nbindings;
    }
}

function binding(size) {
    return new Binding(size);
}

module.exports = binding;

