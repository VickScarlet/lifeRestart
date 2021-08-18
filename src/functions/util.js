function clone(value) {
    switch(typeof value) {
        case 'object':
            if(Array.isArray(value)) return value.map(v=>clone(v));
            const newObj = {};
            for(const key in value) newObj[key] = clone(value[key]);
            return newObj;
        default: return value;
    }
}

function max(...arr) {
    return Math.max(...arr.flat());
}

function min(...arr) {
    return Math.min(...arr.flat());
}

function sum(...arr) {
    let s = 0;
    arr.flat().forEach(v=>s+=v);
    return s;
}

function average(...arr) {
    const s = sum(...arr);
    return s / arr.flat().length;
}

export { clone, max, min, sum, average };