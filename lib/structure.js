
const utils = require('./utils');

function Structure(functor, fnargs) {	
	let args;
    
    if (arguments.length === 2 && Array.isArray(fnargs))
        args = fnargs.slice();
    else {
        args = [];
        
        for (let k = 1; k < arguments.length; k++)
            args.push(arguments[k]);
    }

    this.arity = function () { return args.length;  };
	this.functor = function () { return functor; };
	this.arguments = function () { return args; };
	
	this.atom = function () { return false; };
	this.variable = function () { return false; };
	this.structure = function () { return true; };
	
	let nvariables = 0;
	let nanonymous = 0;
	const variables = [];
	
    this.nvariables = function () { return nvariables; };
	
    this.nanonymous = function () { return nanonymous; };
    
    const signature = functor.name() + ':' + this.arity();
	
	this.signature = function () { return signature; };
	
	this.variables = function () { return variables; };
    
    checkVariable(functor);
    
    for (let k = 0; k < this.arity(); k++)
        checkVariable(args[k]);
    
    adjustStructureNamedVariables(this, variables);
    
    let anonoffset = 0;
    
    adjustStructureAnonymousVariables(this);

    function adjustStructureAnonymousVariables(structure) {
        if (!structure.nanonymous())
            return;

        adjustAnonymousVariables(structure.functor());
        
        for (let k = 0; k < structure.arity(); k++)
            adjustAnonymousVariables(structure.arguments()[k]);
    }
    
    function adjustAnonymousVariables(item) {
        if (!item)
            return;
            
        if (item.nanonymous && item.nanonymous())
            return adjustStructureAnonymousVariables(item);
            
        if (!utils.isVariable(item))
            return;

        if (item.name() !== '_')
            return;
            
        item.offset(anonoffset++);
    }
    
    function adjustStructureNamedVariables(structure, variables) {
        if (!structure.nvariables || !structure.nvariables())
            return;

        adjustNamedVariables(structure.functor(), variables);

        for (let k = 0; k < structure.arity(); k++)
            adjustNamedVariables(structure.arguments()[k], variables);
    }
    
    function adjustNamedVariables(item, variables) {
        if (!item)
            return;
            
        if (item.nvariables && item.nvariables())
            return adjustStructureNamedVariables(item, variables);
            
        if (!utils.isVariable(item))
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
            
        if (!utils.isVariable(item))
            return;
            
        if (item.name() === '_') {
            nanonymous++;
            return;
        }
            
        if (variables.indexOf(item.name()) >= 0)
            return;
            
        variables.push(item.name());
        nvariables++;
    }
    
    function checkVariables(item) {
		if (item.nanonymous)
			nanonymous += item.nanonymous();
        
        for (let k = 0; k < item.nvariables(); k++) {
            const name = item.variables()[k];
            
            if (variables.indexOf(name) >= 0)
                continue;
            
            variables.push(name);
            nvariables++;
        }
    }
}

Structure.prototype.asString = function () {
    let text = this.functor().asString() + '(';
    
    for (let k = 0; k < this.arity(); k++) {
        if (k)
            text += ', ';
            
        text += asString(this.arguments()[k]);
    }
    
    return text + ')';
}

Structure.prototype.match = function (item, bindings, trying) {
    if (!item)
        return false;
        
    if (!(item instanceof Structure)) {
        if (utils.isVariable(item))
            return item.match(this, bindings, trying);
            
        return false;
    }
        
    if (this.arity() !== item.arity())
        return false;
	
    const current = bindings.current();
        
    if (!this.functor().match(item.functor(), bindings, trying)) {
        bindings.reset(current);
        return false;
    }
	    
    for (let k = 0; k < this.arity(); k++) {
        const arg = this.arguments()[k];
        const itemarg = item.arguments()[k];
        
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
        return new Structure(functor);
    
    const obj = new Temp();
    
    Structure.apply(obj, arguments);
    
    return obj;
}

module.exports = structure;

