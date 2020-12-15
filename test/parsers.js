
const parsers = require('../lib/parsers');

exports['parse atom'] = function (test) {
    const parser = parsers.parser('a');
    
    const result = parser.parse('atom');
    
    test.ok(result);
    test.equal(result.name(), 'a');
    
    test.equal(parser.parse('atom'), null);
};

