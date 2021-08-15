import {clone} from './util.js';

class Prop {
    constructor(initialData={}) {
        this.initial(initialData);
    }

    initial(data) {
        this._data = {
            AGE: 0
        };
        for(const key in data)
            this.set(key, data[key]);
    }

    get(prop) {
        switch(prop) {
            case this.TYPES.AGE:
            case this.TYPES.CHR:
            case this.TYPES.INT:
            case this.TYPES.STR:
            case this.TYPES.MNY:
            case this.TYPES.SPR:
            case this.TYPES.LIF:
            case this.TYPES.TLT:
            case this.TYPES.EVT:
                return this._data[prop];
            default: return 0;
        }
    }

    set(prop, value) {
        switch(prop) {
            case this.TYPES.AGE:
            case this.TYPES.CHR:
            case this.TYPES.INT:
            case this.TYPES.STR:
            case this.TYPES.MNY:
            case this.TYPES.SPR:
            case this.TYPES.LIF:
            case this.TYPES.TLT:
            case this.TYPES.EVT:
                this._data[prop] = clone(value);
                break;
            default: return 0;
        }
    }

    change(prop, value) {
        switch(prop) {
            case this.TYPES.AGE:
            case this.TYPES.CHR:
            case this.TYPES.INT:
            case this.TYPES.STR:
            case this.TYPES.MNY:
            case this.TYPES.SPR:
            case this.TYPES.LIF:
                this._data[prop] += value;
                break;
            case this.TYPES.TLT:
            case this.TYPES.EVT:
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

    get TYPES() {
        return {
            AGE: "AGE",
            CHR: "CHR",
            INT: "INT",
            STR: "STR",
            MNY: "MNY",
            SPR: "SPR",
            LIF: "LIF",
            TLT: "TLT",
            EVT: "EVT",
        };
    }
}

export default Prop;