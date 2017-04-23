
module.exports = {
	isVariable: function (item) { return item && item.variable && item.variable(); }
};