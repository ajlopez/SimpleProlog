
var parser = require('../lib/parser');

exports['parse atom'] = function (test) {
    var myparser = parser('a');
    var result = myparser.parse();
    
    test.ok(result);
    test.equal(result.name, 'a');
}

