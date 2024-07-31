import { clone } from './functions/util.js';
import { checkCondition } from './functions/condition.js';

class Event {
    constructor() {}

    #events;

    // 初始化传参数去掉{}
    initial(events) {
        this.#events = events;
        for(const id in events) {
            const event = events[id];
            if(!event.branch || !'branch' in event) continue;
            //判断事件是否被处理过
            event.branch = event.branch.map(b=>{
                b = b.indexOf(":") != -1?b.split(':'):b;
                b[1] = Number(b[1]);
                return b;
            });
        }
    }

    check(eventId, property) {
        const { include, exclude, NoRandom } = this.get(eventId);
        if(NoRandom) return false;
        if(exclude && checkCondition(property, exclude)) return false;
        if(include) return checkCondition(property, include);
        return true;
    }

    get(eventId) {
        // const event = this.#events[eventId];
        // console.log('event.js get',eventId, this.#events)
        var event
        this.#events.forEach(function(item){
        if (item._id == eventId) {
            event = item
        }
        })
        if(!event) throw new Error(`[ERROR] No Event[${eventId}]`);
        return clone(event);
    }

    information(eventId) {
        const { event: description } = this.get(eventId)
        return { description };
    }

    do(eventId, property) {
        const { effect, branch, event: description, postEvent } = this.get(eventId);
        if(branch)
            for(const [cond, next] of branch)
                if(checkCondition(property, cond))
                    return { effect, next, description };
        return { effect, postEvent, description };
    }

}

export default Event;