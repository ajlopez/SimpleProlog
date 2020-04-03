
module.exports = {
	isVariable: function (item) { return item && typeof item.variable === 'function' && item.variable(); },
	isAtom: function (item) { return item && typeof item.atom === 'function' && item.atom(); },
	isStructure: function (item) { return item && typeof item.structure === 'function' && item.structure(); }
};

