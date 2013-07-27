
function Binding(size) {
    var values = [];
    
    this.current = function () {
        return size;
    };
    
    this.get = function (n) {
        var value = values[n];
        
        if (value === undefined)
            return null;

        return value;
    };
}

function binding(size) {
    return new Binding(size);
}

module.exports = binding;

