
const binding = require('./binding');

function Base() {
    const facts = {};
    
    this.query = function (fact, cb) {
        const list = facts[fact.signature()];
        
        if (!list || list.length === 0) {
            if (cb) {
                cb(null, false);
                return;
            }
            
            return false;
        }
        
        const l = list.length;
        let nvariables = (fact.nvariables() || 0) + (fact.nanonymous() || 0);
            
        const bindings = binding(nvariables);
        
        if (!cb) {
            for (const k = 0; k < l; k++)
                if (fact.match(list[k], bindings))
                    return makeResult(fact.variables(), bindings);
                    
            return false;
        }
        
        let k = 0;
        const current = bindings.current();
        
        matchFact();
        
        function matchFact() {
            while (k < l) {
                if (fact.match(list[k], bindings)) {
                    cb(null, makeResult(fact.variables(), bindings), function() {
                        k++;
                        bindings.reset(current);
                        matchFact();
                    });
                    
                    return;
                }
                
                k++;
            }
            
            cb(null, false);
        }
    }
    
    function makeResult(variables, bindings)
    {
        if (!variables || variables.length === 0)
            return true;
            
        const result = { };
        const lv = variables.length;
        
        for (let k = 0; k < lv; k++)
            result[variables[k]] = bindings.get(k);
            
        return result;
    }

    this.assert = function (fact) {
        let list = facts[fact.signature()];
        
        if (!list)
            facts[fact.signature()] = list = [];
            
        list.push(fact);
    }
}

function base() {
    return new Base();
}

module.exports = base;

