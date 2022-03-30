function clone(value) {
    switch(typeof value) {
        case 'object':
            if(value === null) return null;
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

function weightRandom(list) {
    let totalWeights = 0;
    for(const [, weight] of list)
        totalWeights += weight;

    let random = Math.random() * totalWeights;
    for(const [id, weight] of list)
        if((random-=weight)<0)
            return id;
    return list[list.length-1];
}

function listRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function getListValuesMap(list, fn) {
    const map = {};
    list.forEach(key=>map[key] = fn(key));
    return map;
}

function mapConvert(map, fn) {
    for(const key in map)
        map[key] = fn(key, map[key]);
}

function getConvertedMap(map, fn) {
    const newMap = {};
    for(const key in map)
        newMap[key] = fn(key, map[key]);
    return newMap;
}

function mapSet(target, source) {
    for(const key in source)
        target[key] = source[key];
}

function deepMapSet(target, source) {
    for(const key in source) {
        let value = source[key];
        switch(typeof value) {
            case 'function': value = value();
            case 'object':
                if(!Array.isArray(value)) {
                    deepMapSet(target[key], value);
                    break;
                }
            default: target[key] = value;
        }
    }
    return target;
}

function deepGet(obj, path) {
    for(const key of path.split('.')) {
        if(!(key in obj)) return undefined;
        obj = obj[key];
    }
    return obj;
}

function format(str, ...args) {
    const replace = set => (match, key) => {
        const value = deepGet(set, key);
        switch(typeof value) {
            case 'object': return JSON.stringify(value);
            case 'boolean':
            case 'number':
            case 'string': return value;
            default: return value?.toString?.() || match;
        }
    };

    switch(args.length) {
        case 0: return str;
        case 1:
            if (typeof(args[0]) != "object") break;
            return str.replace(/{(.+?)}/g, replace(args[0]));
    }
    return str.replace(/{(\d+)}/g, replace(args));
}

export { clone, max, min, sum, average, weightRandom, listRandom, getListValuesMap, mapConvert, getConvertedMap, mapSet, deepMapSet, format };