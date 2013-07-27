
function Variable(name) {
    this.name = name;
}

Variable.prototype.asString = function () {
    return this.name;
};

function variable(name) {
    return new Variable(name);
}

module.exports = variable;

