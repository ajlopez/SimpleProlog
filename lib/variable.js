
function Variable(name, offset) {
    this.name = name;
    this.variable = true;
    
    if (offset != null)
        this.offset = offset;
}

Variable.prototype.asString = function () {
    return this.name;
};

function variable(name, offset) {
    return new Variable(name, offset);
}

module.exports = variable;

