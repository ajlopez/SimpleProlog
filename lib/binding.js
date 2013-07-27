
function Binding(size) {
    var values = [];
    
    this.current = function () {
        return size;
    };
    
    this.get = function (n) {
        return values[n];
    };
}

function binding(size) {
    return new Binding(size);
}

module.exports = binding;

