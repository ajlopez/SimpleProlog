
function Structure(functor, args) {
    this.functor = functor;
    
    if (arguments.length === 2 && Array.isArray(args))
        this.args = args.slice();
    else {
        this.args = [];
        for (var k = 1; k < arguments.length; k++)
            this.args.push(arguments[k]);
    }

    this.arity = function () { return this.args.length;  };
	
	var nvariables = 0;
	var nanonymous = 0;
	
    this.nvariables = function () { return nvariables; };
	
    this.nanonymous = function () { return nanonymous; };
    
    this.signature = this.functor.name() + ':' + this.arity();
    
    var self = this;
    
    checkVariable(this.functor);
    
    for (var k = 0; k < this.arity(); k++)
        checkVariable(this.args[k]);
    
    adjustStructureNamedVariables(this, this.variables);
    
    var anonoffset = 0;
    
    adjustStructureAnonymousVariables(this);

    function adjustStructureAnonymousVariables(structure) {
        if (!structure.nanonymous())
            return;

        adjustAnonymousVariables(structure.functor);
        
        for (var k = 0; k < structure.arity(); k++)
            adjustAnonymousVariables(structure.args[k]);
    }
    
    function adjustAnonymousVariables(item) {
        if (!item)
            return;
            
        if (item.nanonymous && item.nanonymous())
            return adjustStructureAnonymousVariables(item);
            
        if (!item.variable)
            return;
            
        if (!item.variable())
            return;

        if (item.name() !== '_')
            return;
            
        item.offset(anonoffset++);
    }
    
    function adjustStructureNamedVariables(structure, variables) {
        if (!structure.nvariables || !structure.nvariables())
            return;

        adjustNamedVariables(structure.functor, variables);
        for (var k = 0; k < structure.arity(); k++)
            adjustNamedVariables(structure.args[k], variables);
    }
    
    function adjustNamedVariables(item, variables) {
        if (!item)
            return;
            
        if (item.nvariables && item.nvariables())
            return adjustStructureNamedVariables(item, variables);
            
        if (!item.variable)
            return;

        if (!item.variable())
            return;
            
        if (item.name() === '_')
            return;
            
        item.offset(variables.indexOf(item.name()));
    }
        
    function checkVariable(item) {
        if (!item)
            return;
            
        if ((item.nvariables && item.nvariables()) || (item.nanonymous && item.nanonymous()))
            return checkVariables(item);
            
        if (!item.variable)
            return;
		
		if (!item.variable())
			return;
            
        if (item.name() === '_') {
            nanonymous++;
            return;
        }
            
        if (self.variables && self.variables.indexOf(item.name()) >= 0)
            return;
            
        if (!self.variables)
            self.variables = [];
        
        self.variables.push(item.name());
        nvariables++;
    }
    
    function checkVariables(item) {
		if (item.nanonymous)
			nanonymous += item.nanonymous();
        
        for (var k = 0; k < item.nvariables(); k++) {
            var name = item.variables[k];
            if (self.variables && self.variables.indexOf(name) >= 0)
                continue;
            if (!self.variables)
                self.variables = [];
            
            self.variables.push(name);
            nvariables++;
        }
    }
}

Structure.prototype.asString = function () {
    var text = this.functor.asString() + '(';
    
    for (var k = 0; k < this.arity(); k++) {
        if (k)
            text += ', ';
            
        text += asString(this.args[k]);
    }
    
    return text + ')';
}

Structure.prototype.match = function (item, bindings, trying) {
    if (!item)
        return false;
        
    if (!(item instanceof Structure)) {
        if (item.variable && item.variable())
            return item.match(this, bindings, trying);
            
        return false;
    }
        
    if (this.arity() !== item.arity())
        return false;
	
    var current = bindings.current();
        
    if (!this.functor.match(item.functor, bindings, trying)) {
        bindings.reset(current);
        return false;
    }
        
    for (var k = 0; k < this.arity(); k++) {
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

Temp.prototype = Structure.prototype;

function structure(functor, args) {
    if (!args)
        return new Structure(functor, []);
    var obj = new Temp();
    Structure.apply(obj, arguments);
    return obj;
    //return new Structure(functor, args);
}

module.exports = structure;

