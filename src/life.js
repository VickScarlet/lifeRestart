import { readFile } from 'fs/promises';
import Property from './property.js';
import Event from './event.js';
import Talent from './talent.js';

class Life {
    constructor() {
        this.#property = new Property();
        this.#event = new Event();
        this.#talent = new Talent();
    }

    async initial() {
        const age = JSON.parse(await readFile('data/age.json'));
        const talents = JSON.parse(await readFile('data/talents.json'));
        const events = JSON.parse(await readFile('data/events.json'));

        this.#property.initial({age});
        this.#talent.initial({talents});
        this.#event.initial({events});
    }

    restart(allocation) {
        this.#prop.restart(allocation);
    }

    next() {
        const {age, event, talent} = this.#prop.ageNext();

        const eventId = this.random(event);
    }

    random(events) {
        events.filter(([eventId])=>this.#event.check(eventId));

        let totalWeights = 0;
        for(const [, weight] of events)
            totalWeights += weight;

        let random = Math.random() * totalWeights;
        for(const [eventId, weight] of events)
            if((random-=weight)<0)
                return eventId;
    }
}

export default Life;