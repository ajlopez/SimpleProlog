
var atom = require('./atom');

function Variable(name, offset) {
    this.name = name;
    this.variable = true;
    
    if (offset != null)
        this.offset = offset;
}

Variable.prototype.asString = function () {
    return this.name;
};

Variable.prototype.match = function (item, bindings, trying) {
    if (item.variable) {
        if (this.offset == item.offset)
            return true;
            
        if (tried(trying, this.offset, item.offset))
            return true;
            
        var newtrying = addTry(trying, this.offset, item.offset);
    }
    else
        var newtrying = trying;
        
    var value = bindings.get(this.offset);
    
    if (value != null) {
        if (value.match)
            return value.match(item, bindings, newtrying);
            
        if (item.variable)
            return item.match(value, bindings, newtrying);
            
        if (value == item)
            return true;
            
        return false;
    }
    
    if (item.variable) {
        var value2 = bindings.get(item.offset);
        
        if (value2 != null)
            return this.match(value2, bindings, newtrying);
    }
    
    if (item.variable && item.offset > this.offset)
        bindings.set(item.offset, this);
    else
        bindings.set(this.offset, item);
        
    return true;
}

function variable(name, offset) {
    return new Variable(name, offset);
}

function tried(trying, offset1, offset2) {
    if (!trying)
        return false;
        
    var l = trying.length;
        
    for (var k = 0; k < l; k++) {
        var trypair = trying[k];
        
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
        
    var newtrying = trying.slice();
    newtrying.push([offset, offset2]);
    
    return newtrying;
}

module.exports = variable;

