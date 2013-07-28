
function Binding(size) {
    var values = [];
    
    this.current = function () {
        return size;
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
    }
    
    this.grow = function (increment) {
        for (var k = 0; k < increment; k++)
            values[k + size] = null;
            
        size += increment;
    }
    
    this.reset = function (newsize) {
        size = newsize;
    }
}

function binding(size) {
    return new Binding(size);
}

module.exports = binding;

