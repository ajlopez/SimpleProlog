
function Variable(name) {
    this.name = name;
    this.variable = true;
}

Variable.prototype.asString = function () {
    return this.name;
};

function variable(name) {
    return new Variable(name);
}

module.exports = variable;

