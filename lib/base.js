
var binding = require('./binding');

function Base() {
    var facts = [];
    
    this.query = function (fact, cb) {
        var l = facts.length;
        var bindings;
        var nvariables = 0;         
        
        if (fact.nvariables || fact.nanonymous)
            nvariables = fact.nvariables + fact.nanonymous;
            
        bindings = binding(nvariables);
        
        if (!cb) {
            for (var k = 0; k < l; k++)
                if (fact.match(facts[k], bindings))
                    return makeResult(fact.variables, bindings);
                    
            return false;
        }
        
        var k = 0;
        var current = bindings.current();
        
        matchFact();
        
        function matchFact() {
            while (k < l) {
                if (fact.match(facts[k], bindings)) {
                    cb(null, makeResult(fact.variables, bindings), function() {
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
    
    this.assert = function (fact) {
        facts.push(fact);
    }
}

function makeResult(variables, bindings)
{
    if (!variables || variables.length === 0)
        return true;
        
    var result = { };
    var lv = variables.length;
    
    for (var k = 0; k < lv; k++)
        result[variables[k]] = bindings.get(k);
        
    return result;
}

function base() {
    return new Base();
}

module.exports = base;

