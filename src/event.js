import { clone } from './functions/util.js';
import { checkCondition } from './functions/condition.js';

class Event {
    constructor(initialData={}) {
        this.initial(initialData);
    }

    initial({events}) {
        this.#events = events;
        for(const id in events) {
            const event = events[id];
            if(!event.branch) continue;
            event.branch = event.branch.map(b=>{
                b = b.split(':');
                b[1] = Number(b[1]);
                return b;
            });
        }
    }

    check(eventId) {
        const { include, exclude } = this.get(eventId);
        if(exclude && checkCondition(exclude)) return false;
        if(include) return checkCondition(include);
        return true;
    }

    get(eventId) {
        const event = this.#events[eventId];
        if(!event) throw new Error(`[ERROR] No Event[${eventId}]`);
        return clone(event);
    }

    description(eventId) {
        return this.get(eventId).description;
    }

    do(eventId) {
        const { effect, branch } = this.get(eventId);
        if(branch)
            for(const [cond, next] of branch)
                if(checkCondition(cond))
                    return { effect, next };
        return { effect };
    }

}

export default Event;