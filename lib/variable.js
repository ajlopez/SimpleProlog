
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

Variable.prototype.match = function (item, bindings) {
    var value = bindings.get(this.offset);
    
    if (value != null) {
        if (value.match)
            return value.match(item, bindings);
            
        return false;
    }
    
    if (item && item.variable && item.offset > this.offset)
        bindings.set(item.offset, this);
    else
        bindings.set(this.offset, item);
        
    return true;
}

function variable(name, offset) {
    return new Variable(name, offset);
}

module.exports = variable;

