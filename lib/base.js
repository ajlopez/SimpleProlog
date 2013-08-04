
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
                    if (fact.variables) {
                        var result = { };
                        var lv = fact.variables.length;
                        
                        for (var nv = 0; nv < lv; nv++)
                            result[fact.variables[nv]] = bindings.get(nv);
                            
                        return result;
                    }
                    else
                        return true;
                    
            return false;
        }
        
        var k = 0;
        var current = bindings.current();
        
        matchFact();
        
        function matchFact() {
            while (k < l) {
                if (fact.match(facts[k], bindings)) {
                    cb(null, bindings, function() {
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

function base() {
    return new Base();
}

module.exports = base;

