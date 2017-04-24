
module.exports = {
	isVariable: function (item) { return item && item.variable && item.variable(); }
	isAtom: function (item) { return item && item.atom && item.atom(); }
};