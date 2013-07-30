
function Fact(functor, args) {
    this.functor = functor;
    this.args = args;
    this.arity = args.length;
    this.nvariables = 0;
    this.nanonymous = 0;
    
    for (var k = 0; k < args.length; k++) {
        var arg = args[k];
        if (arg.variable) {
            this.nvariables++;

            if (!this.variables)
                this.variables = [];
                
            this.variables.push(arg.name);
        }
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

