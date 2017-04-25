
module.exports = {
	isVariable: function (item) { return item && item.variable && item.variable(); },
	isAtom: function (item) { return item && item.atom && item.atom(); },
	isStructure: function (item) { return item && item.structure && item.structure(); }
};

