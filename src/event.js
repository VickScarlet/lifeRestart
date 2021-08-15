import {clone} from './util.js';

class Event {
    constructor(initialData={}) {
        this.initial(initialData);
    }

    initial({prop, condition, events, pools}) {
        if(prop) this.prop = prop;
        if(condition) this.condition = condition;
        if(events) this.events = events;
        if(pools) this.pools = pools;
    }

    random() {
        const age = this.getProp(this.prop.TYPES.AGE);
        const pool = this.filterPool(
            this.getPool(age)
        );

        let totalWeights = 0;
        for(const [,weight] of pool)
            totalWeights += weight;

        let random = Math.random() * totalWeights;
        for(const [event,weight] of pool)
            if((random-=weight)<0)
                return event;
    }

    check(eventId) {
        const { Include, Exclude } = this.get(eventId);
        if(Exclude && this.checkCondition(Exclude)) return false;
        if(Include) return this.checkCondition(Include);
        return true;
    }

    checkCondition(condition) {
        return this.condition.check(condition);
    }

    filterPool(pool) {
        return pool.filter(([event])=>this.check(event));
    }

    get(eventId) {
        const event = this.events[eventId];
        if(!event) console.error(`[ERROR] No Event[${eventId}]`);
        return clone(event);
    }

    getPool(age) {
        return clone(this.pools[age].Pool) || [];
    }

    getProp(prop) {
        return this.prop.get(prop);
    }

    get prop() {return this._prop;}
    set prop(p) {this._prop = p;}

    get condition() {return this._condition;}
    set condition(c) {this._condition = c;}

    get pools() {return this._pools;}
    set pools(p) {
        this._pools = p;

        for(const age in p)
            p[age].Pool = p[age].Pool?.map(v=>{
                const value = v.split('*').map(n=>Number(n));
                if(value.length==1) value.push(1);
                return value;
            });

    }

    get events() {return this._events;}
    set events(e) {
        this._events = e;
        for(const id in e) {
            const event = e[id];
            if(!event.branch) continue;
            event.branch = event.branch.map(b=>{
                b = b.split(':');
                b[1] = Number(b[1]);
                return b;
            });
        }
    }

}

export default Event;