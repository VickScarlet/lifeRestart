import Property from './property.js';
import Event from './event.js';
import Talent from './talent.js';

class Life {
    constructor() {
        this.#property = new Property();
        this.#event = new Event();
        this.#talent = new Talent();
    }

    #property;
    #event;
    #talent;
    #triggerTalents;

    async initial() {
        const age = JSON.parse(await json('data/age.json'));
        const talents = JSON.parse(await json('data/talents.json'));
        const events = JSON.parse(await json('data/events.json'));

        this.#property.initial({age});
        this.#talent.initial({talents});
        this.#event.initial({events});
    }

    restart(allocation) {
        this.#triggerTalents = new Set();
        this.#property.restart(allocation);
        this.doTalent();
    }

    next() {
        const {age, event, talent} = this.#property.ageNext();

        const talentContent = this.doTalent(talent);
        const eventContent = this.doEvent(this.random(event));

        const isEnd = this.#property.isEnd();

        const content = [talentContent, eventContent].flat();
        return { age, content, isEnd };
    }

    doTalent(talents) {
        if(talents) this.#property.change(this.#property.TYPES.TLT, talents);
        talents = this.#property.get(this.#property.TYPES.TLT)
            .filter(talentId=>!this.#triggerTalents.has(talentId));

        const contents = [];
        for(const talentId of talents) {
            const result = this.#talent.do(talentId);
            if(!result) continue;
            this.#triggerTalents.add(talentId);
            const { effect, name, desctiption } = result;
            contents.push({
                type: this.#property.TYPES.TLT,
                name,
                rate,
                desctiption,
            })
            if(!result.effect) continue;
            this.#property.effect(effect);
        }
        return contents;
    }

    doEvent(eventId) {
        const { effect, next, description, postEvent } = this.#event.do(eventId, this.#property);
        this.#property.change(this.#property.TYPES.EVT, eventId);
        this.#property.effect(effect);
        const content = {
            type: this.#property.TYPES.EVT,
            description,
            postEvent,
        }
        if(next) return [content, this.doEvent(next)].flat();
        return [content];
    }

    random(events) {
        events = events.filter(([eventId])=>this.#event.check(eventId, this.#property));

        let totalWeights = 0;
        for(const [, weight] of events)
            totalWeights += weight;

        let random = Math.random() * totalWeights;
        for(const [eventId, weight] of events)
            if((random-=weight)<0)
                return eventId;
        return events[events.length-1];
    }
}

export default Life;