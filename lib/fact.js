
function Fact(functor, args) {
    this.functor = functor;
    this.args = args.slice();
    this.arity = args.length;
    this.nvariables = 0;
    this.nanonymous = 0;
    var self = this;
    
    checkVariable(this.functor);
    
    for (var k = 0; k < this.args.length; k++)
        checkVariable(this.args[k]);
    
    function checkVariable(item) {
        if (!item || !item.variable)
            return;
            
        if (self.variables && self.variables.indexOf(item.name) >= 0)
            return;
            
        if (!self.variables)
            self.variables = [];
        
        self.variables.push(item.name);
        self.nvariables++;
    }
}

Fact.prototype.asString = function () {
    var text = this.functor.asString() + '(';
    
    for (var k = 0; k < this.arity; k++) {
        if (k)
            text += ', ';
            
        text += asString(this.args[k]);
    }
    
    return text + ')';
}

Fact.prototype.match = function (item) {
    if (!item)
        return false;
        
    if (!(item instanceof Fact))
        return false;
        
    if (this.arity !== item.arity)
        return false;
        
    if (!this.functor.match(item.functor))
        return false;
        
    for (var k = 0; k < this.arity; k++) {
        var arg = this.args[k];
        var itemarg = item.args[k];
        
        if (arg === itemarg)
            continue;
        
        if (!arg.match)
            return false;
            
        if (!arg.match(itemarg))
            return false;
    }
    
    return true;
}

function asString(obj) {
    if (obj.asString)
        return obj.asString();
    
    return obj.toString();
}

function fact(functor, args) {
    if (!args)
        return new Fact(functor, []);
        
    return new Fact(functor, args);
}

module.exports = fact;

