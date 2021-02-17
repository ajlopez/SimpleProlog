
function isVariable(item) {
    return item && typeof item.variable === 'function' && item.variable();
}

function isAtom(item) { 
    return item && typeof item.atom === 'function' && item.atom(); 
}

function isStructure(item) { 
    return item && typeof item.structure === 'function' && item.structure(); 
}

function isQuery(item) {
    if (!isStructure(item))
        return false;
    
    if (!isAtom(item.functor()))
        return false;
    
    if (item.functor().name() != '?-')
        return false;
    
    return true;
}

module.exports = {
	isVariable,
	isAtom,
	isStructure,    
    isQuery
};

