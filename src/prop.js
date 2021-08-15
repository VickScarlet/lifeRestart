class Prop {
    constructor(initialData) {
        this._data = {};
        for(const key in initialData)
            this.set(key, initialData[key]);
    }

    get(prop) {
        switch(prop) {
            case 'CHR':
            case 'INT':
            case 'STR':
            case 'MNY':
            case 'SPR':
            case 'LIF':
            case 'TLT':
            case 'EVT':
                return this._data[prop];
            default: return 0;
        }
    }

    set(prop, value) {
        switch(prop) {
            case 'CHR':
            case 'INT':
            case 'STR':
            case 'MNY':
            case 'SPR':
            case 'LIF':
            case 'TLT':
            case 'EVT':
                this._data[prop] = this.clone(value);
                break;
            default: return 0;
        }
    }

    change(prop, value) {
        switch(prop) {
            case 'CHR':
            case 'INT':
            case 'STR':
            case 'MNY':
            case 'SPR':
            case 'LIF':
                this._data[prop] += value;
                break;
            case 'TLT':
            case 'EVT':
                const v = this._data[prop];
                if(value<0) {
                    const index = v.indexOf(value);
                    if(index!=-1) v.splice(index,1);
                }
                if(!v.includes(value)) v.push(value);
                break;
            default: return;
        }
    }

    clone(value) {
        switch(typeof value) {
            case 'object':
                if(Array.isArray(value)) return value.map(v=>this.clone(v));
                const newObj = {};
                for(const key in value) newObj[key] = this.clone(value[key]);
                return newObj;
            default: return value;
        }
    }
}

export default Prop;