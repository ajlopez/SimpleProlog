
function Base() {
    var facts = [];
    
    this.query = function (fact) {
        return false;
    }
}

function base() {
    return new Base();
}

module.exports = base;

