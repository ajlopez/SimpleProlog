
var binding = require('./binding');

function Base() {
    var facts = [];
    
    this.query = function (fact) {
        var l = facts.length;
        var bindings;
        
        if (fact.nvariables || fact.nanonymous)
            bindings = binding(fact.nvariables + fact.nanonymous)
        else
            bindings = binding(0);
        
        for (var k = 0; k < l; k++)
            if (fact.match(facts[k], bindings))
                return true;
                
        return false;
    }
    
    this.assert = function (fact) {
        facts.push(fact);
    }
}

function base() {
    return new Base();
}

module.exports = base;

