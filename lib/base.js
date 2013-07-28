
function Base() {
    var facts = [];
    
    this.query = function (fact) {
        var l = facts.length;
        
        for (var k = 0; k < l; k++)
            if (fact.match(facts[k]))
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

