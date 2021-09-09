import Property from './property.js';
import Event from './event.js';
import Talent from './talent.js';
import Achievement from './achievement.js';

class Life {
    constructor() {
        this.#property = new Property();
        this.#event = new Event();
        this.#talent = new Talent();
        this.#achievement = new Achievement();
    }

    #property;
    #event;
    #talent;
    #achievement;
    #triggerTalents;

    async initial() {
        const [age, talents, events, achievements] = await Promise.all([
          json('age'),
          json('talents'),
          json('events'),
          json('achievement'),
        ])
        this.#property.initial({age});
        this.#talent.initial({talents});
        this.#event.initial({events});
        this.#achievement.initial({achievements});
    }

    restart(allocation) {
        this.#triggerTalents = {};
        this.#property.restart(allocation);
        this.doTalent();
        this.#property.restartLastStep();
        this.#achievement.achieve(
            this.#achievement.Opportunity.START,
            this.#property
        )
    }

    getTalentAllocationAddition(talents) {
        return this.#talent.allocationAddition(talents);
    }

    getTalentCurrentTriggerCount(talentId) {
        return this.#triggerTalents[talentId] || 0;
    }

    next() {
        const {age, event, talent} = this.#property.ageNext();

        const talentContent = this.doTalent(talent);
        const eventContent = this.doEvent(this.random(event));

        const isEnd = this.#property.isEnd();

        const content = [talentContent, eventContent].flat();
        this.#achievement.achieve(
            this.#achievement.Opportunity.TRAJECTORY,
            this.#property
        )
        return { age, content, isEnd };
    }

    doTalent(talents) {
        if(talents) this.#property.change(this.#property.TYPES.TLT, talents);
        talents = this.#property.get(this.#property.TYPES.TLT)
            .filter(talentId => this.getTalentCurrentTriggerCount(talentId) < this.#talent.get(talentId).max_triggers);

        const contents = [];
        for(const talentId of talents) {
            const result = this.#talent.do(talentId, this.#property);
            if(!result) continue;
            this.#triggerTalents[talentId] = this.getTalentCurrentTriggerCount(talentId) + 1;
            const { effect, name, description, grade } = result;
            contents.push({
                type: this.#property.TYPES.TLT,
                name,
                grade,
                description,
            })
            if(!effect) continue;
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

    talentRandom() {
        return this.#talent.talentRandom(this.getLastExtendTalent());
    }

    talentExtend(talentId) {
        this.#property.set(this.#property.TYPES.EXT, talentId);
    }

    getLastExtendTalent() {
        return this.#property.get(this.#property.TYPES.EXT);
    }

    getSummary() {
        this.#achievement.achieve(
            this.#achievement.Opportunity.SUMMARY,
            this.#property
        )
        return {
            AGE: this.#property.get(this.#property.TYPES.HAGE),
            CHR: this.#property.get(this.#property.TYPES.HCHR),
            INT: this.#property.get(this.#property.TYPES.HINT),
            STR: this.#property.get(this.#property.TYPES.HSTR),
            MNY: this.#property.get(this.#property.TYPES.HMNY),
            SPR: this.#property.get(this.#property.TYPES.HSPR),
            SUM: this.#property.get(this.#property.TYPES.SUM),
        };
    }

    getLastRecord() {
        return this.#property.getLastRecord();
    }

    exclusive(talents, exclusive) {
        return this.#talent.exclusive(talents, exclusive);
    }

    getAchievements() {
        return this.#achievement.list();
    }

    get times() { return this.#property?.get(this.#property.TYPES.TMS) || 0; }
    set times(v) {
        this.#property?.set(this.#property.TYPES.TMS, v) || 0;
        this.#achievement.achieve(
            this.#achievement.Opportunity.END,
            this.#property
        )
    }
}

export default Life;

