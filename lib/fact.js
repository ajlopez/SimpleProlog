
function Fact(functor, args) {
    this.functor = functor;
    this.args = args;
    this.arity = args.length;
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

function asString(obj) {
    if (obj.asString)
        return obj.asString();
    
    return obj.toString();
}

function fact(functor, args) {
    return new Fact(functor, args);
}

module.exports = fact;

