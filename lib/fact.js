
function Fact(functor, args) {
    this.functor = functor;
    
    if (arguments.length == 2 && Array.isArray(args))
        this.args = args.slice();
    else {
        this.args = [];
        for (var k = 1; k < arguments.length; k++)
            this.args.push(arguments[k]);
    }

    this.arity = this.args.length;
    this.nvariables = 0;
    this.nanonymous = 0;
    var self = this;
    
    checkVariable(this.functor);
    
    for (var k = 0; k < this.arity; k++)
        checkVariable(this.args[k]);
    
    adjustFactNamedVariables(this, this.variables);
    
    var anonoffset = 0;
    
    adjustFactAnonymousVariables(this);

    function adjustFactAnonymousVariables(fact) {
        if (!fact.nanonymous)
            return;

        adjustAnonymousVariables(fact.functor);
        
        for (var k = 0; k < fact.arity; k++)
            adjustAnonymousVariables(fact.args[k]);
    }
    
    function adjustAnonymousVariables(item) {
        if (!item)
            return;
            
        if (item.nanonymous)
            return adjustFactAnonymousVariables(item);
            
        if (!item.variable)
            return;
            
        if (item.name != '_')
            return;
            
        item.offset = anonoffset++;
    }
    
    function adjustFactNamedVariables(fact, variables) {
        if (!fact.nvariables)
            return;

        adjustNamedVariables(fact.functor, variables);
        for (var k = 0; k < fact.arity; k++)
            adjustNamedVariables(fact.args[k], variables);
    }
    
    function adjustNamedVariables(item, variables) {
        if (!item)
            return;
            
        if (item.nvariables)
            return adjustFactNamedVariables(item, variables);
            
        if (!item.variable)
            return;
            
        if (item.name == '_')
            return;
            
        item.offset = variables.indexOf(item.name);
    }
        
    function checkVariable(item) {
        if (!item)
            return;
            
        if (item.nvariables || item.nanonymous)
            return checkVariables(item);
            
        if (!item.variable)
            return;
            
        if (item.name == '_') {
            self.nanonymous++;
            return;
        }
            
        if (self.variables && self.variables.indexOf(item.name) >= 0)
            return;
            
        if (!self.variables)
            self.variables = [];
        
        self.variables.push(item.name);
        self.nvariables++;
    }
    
    function checkVariables(item) {
        self.nanonymous += item.nanonymous;
        
        for (var k = 0; k < item.nvariables; k++) {
            var name = item.variables[k];
            if (self.variables && self.variables.indexOf(name) >= 0)
                continue;
            if (!self.variables)
                self.variables = [];
            
            self.variables.push(name);
            self.nvariables++;
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

Fact.prototype.match = function (item, bindings, trying) {
    if (!item)
        return false;
        
    if (!(item instanceof Fact)) {
        if (item.variable)
            return item.match(this, bindings, trying);
            
        return false;
    }
        
    if (this.arity !== item.arity)
        return false;
        
    var current = bindings.current();
        
    if (!this.functor.match(item.functor, bindings, trying)) {
        bindings.reset(current);
        return false;
    }
        
    for (var k = 0; k < this.arity; k++) {
        var arg = this.args[k];
        var itemarg = item.args[k];
        
        if (arg === itemarg)
            continue;
        
        if (!arg.match || !arg.match(itemarg, bindings, trying)) {
            bindings.reset(current);
            return false;
        }
    }
    
    return true;
}

function asString(obj) {
    if (obj.asString)
        return obj.asString();
    
    return obj.toString();
}

// see http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply

function Temp() {}

Temp.prototype = Fact.prototype;

function fact(functor, args) {
    if (!args)
        return new Fact(functor, []);
    var obj = new Temp();
    Fact.apply(obj, arguments);
    return obj;
    //return new Fact(functor, args);
}

module.exports = fact;

