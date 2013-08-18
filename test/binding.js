
var binding = require('../lib/binding');
    
exports['binding as a function'] = function (test) {
    test.ok(binding);
    test.equal(typeof binding, 'function');
}

exports['create binding'] = function (test) {
    var result = binding(2);
    test.ok(result);
    var current = result.current();
    test.ok(current);
    test.equal(typeof current, 'object');
    test.equal(current.size, 2);
    test.equal(current.nbindings, 0);
    test.equal(result.get(0), null);
    test.equal(result.get(1), null);
}

exports['strict null'] = function (test) {
    var result = binding(2);
    
    test.strictEqual(result.get(0), null);
    test.strictEqual(result.get(1), null);
}

exports['raise if invalid offset'] = function (test) {
    var result = binding(2);
    
    test.throws(
        function() {
            result.get(-1);
        },
        Error
    );

    test.throws(
        function() {
            result.get(2);
        },
        Error
    );
}

exports['set and get'] = function (test) {
    var result = binding(2);

    result.set(0, 1);
    result.set(1, "foo");

    test.equal(result.get(0), 1);
    test.equal(result.get(1), "foo");
}

exports['raise if invalid offset in set'] = function (test) {
    var result = binding(2);
    
    test.throws(
        function() {
            result.set(-1, "foo");
        },
        Error
    );

    test.throws(
        function() {
            result.set(2, "bar");
        },
        Error
    );
}

exports['grows'] = function (test) {
    var result = binding(2);

    result.set(0, 1);
    result.set(1, "foo");
    
    result.grow(3);

    var current = result.current();
    test.equal(current.size, 5);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), "foo");
    test.strictEqual(result.get(2), null);
    test.strictEqual(result.get(3), null);
    test.strictEqual(result.get(4), null);
}

exports['reset'] = function (test) {
    var result = binding(2);

    result.set(0, 1);
    result.set(1, "foo");
    result.grow(3);
    
    result.reset({ size: 3, nbindings: 2});

    test.equal(result.current().size, 3);
    test.equal(result.current().nbindings, 2);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), "foo");
    test.strictEqual(result.get(2), null);
}

exports['raise if reset receives invalid size argument'] = function (test) {
    var result = binding(2);

    result.set(0, 1);
    result.set(1, "foo");
    
    test.throws(
        function() {
            result.reset({ size: -1, nbindings: 0 });
        },
        Error
    );

    test.throws(
        function() {
            result.reset({ size: 4, nbindings: 0 });
        },
        Error
    );
}

exports['raise if reset receives invalid nbindings argument'] = function (test) {
    var result = binding(2);

    result.set(0, 1);
    result.set(1, "foo");
    
    test.throws(
        function() {
            result.reset({ size: 0, nbindings: -1 });
        },
        Error
    );

    test.throws(
        function() {
            result.reset({ size: 0, nbindings: 4 });
        },
        Error
    );
}

exports['Reset bindings'] = function (test) {
    var bindings = binding(3);
    bindings.set(0, 1);
    bindings.set(1, 2);
    bindings.set(2, 3);
    var current = bindings.current();
    test.ok(current);
    test.equal(current.size, 3);
    test.equal(current.nbindings, 3);
    bindings.reset({ size: 3, nbindings: 0 });
    test.equal(bindings.get(0), null);
    test.equal(bindings.get(1), null);
    test.equal(bindings.get(2), null);
    var current = bindings.current();
    test.ok(current);
    test.equal(current.size, 3);
    test.equal(current.nbindings, 0);
}
