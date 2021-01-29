
const utils = require('./utils');

function Structure(functor, fnargs) {	
	let args;
    const nargs = arguments.length;
    
    if (nargs === 2 && Array.isArray(fnargs))
        args = fnargs.slice();
    else {
        args = [];
        
        for (let k = 1; k < nargs; k++)
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
        
        const args = structure.arguments();
        const nargs = args.length;
        
        for (let k = 0; k < nargs; k++)
            adjustAnonymousVariables(args[k]);
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

        const args = structure.arguments();
        const nargs = args.length;

        for (let k = 0; k < nargs; k++)
            adjustNamedVariables(args[k], variables);
    }
    
    function adjustNamedVariables(item, variables) {
        if (!item)
            return;
            
        if (item.nvariables && item.nvariables())
            return adjustStructureNamedVariables(item, variables);
            
        if (!utils.isVariable(item))
            return;
        
        const iname = item.name();
            
        if (iname === '_')
            return;
            
        item.offset(variables.indexOf(iname));
    }
        
    function checkVariable(item) {
        if (!item)
            return;
            
        if ((typeof item.nvariables === 'function' && item.nvariables()) || (typeof item.nanonymous === 'function' && item.nanonymous()))
            return checkVariables(item);
            
        if (!utils.isVariable(item))
            return;
            
        if (item.name() === '_') {
            nanonymous++;
            return;
        }
            
        const iname = item.name();

        if (variables.indexOf(iname) >= 0)
            return;
            
        variables.push(iname);
        nvariables++;
    }
    
    function checkVariables(item) {
		if (item.nanonymous)
			nanonymous += item.nanonymous();
        
        const vars = item.variables();
        const nvars = vars.length;
        
        for (let k = 0; k < nvars; k++) {
            const name = vars[k];
            
            if (variables.indexOf(name) >= 0)
                continue;
            
            variables.push(name);
            nvariables++;
        }
    }
}

Structure.prototype.asString = function () {
    const fnname = this.functor().name();
    
    if (fnname === ':-')
        return this.ruleAsString();
    
    if (fnname === '?-')
        return this.queryAsString();
    
    let text = this.functor().asString() + '(';
    const args = this.arguments();
    const nargs = args.length;
    
    for (let k = 0; k < nargs; k++) {
        if (k)
            text += ', ';
            
        text += asString(args[k]);
    }
    
    return text + ')';
}

Structure.prototype.ruleAsString = function () {
    const args = this.arguments();
    let text = args[0].asString() + ' :- ';
    const nargs = args.length;
    
    for (let k = 1; k < nargs; k++) {
        if (k > 1)
            text += ', ';
            
        text += asString(args[k]);
    }
    
    return text;
}

Structure.prototype.queryAsString = function () {
    const args = this.arguments();
    let text = '?- ';
    const nargs = args.length;
    
    for (let k = 0; k < nargs; k++) {
        if (k)
            text += ', ';
            
        text += asString(args[k]);
    }
    
    return text;
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
    const self = this;
    
    const result = tryMatch();
    
    if (!result)
        bindings.reset(current);
    
    return result;

    function tryMatch() {
        if (!self.functor().match(item.functor(), bindings, trying))
            return false;
            
        const args = self.arguments();
        const nargs = args.length;
        const iargs = item.arguments();

        for (let k = 0; k < nargs; k++) {
            const arg = args[k];
            const itemarg = iargs[k];
            
            if (arg === itemarg)
                continue;
            
            if (!arg.match || !arg.match(itemarg, bindings, trying))
                return false;
        }
        
        return true;
    }
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

