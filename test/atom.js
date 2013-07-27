
var atom = require('../lib/atom'),
    assert = require('assert');
    
// atom as a function

assert.ok(atom);
assert.equal(typeof atom, 'function');

// create atom with name

var atomfoo = atom('foo');
assert.ok(atomfoo);
assert.equal(atomfoo.name, 'foo');
assert.equal(atomfoo.asString(), 'foo');

