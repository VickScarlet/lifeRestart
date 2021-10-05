import { weightRandom } from './functions/util.js'
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
        const contents = this.talentReplace(allocation.TLT);
        this.#property.restart(allocation);
        this.doTalent()
        this.#property.restartLastStep();
        this.#achievement.achieve(
            this.#achievement.Opportunity.START,
            this.#property
        )
        return contents;
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

    talentReplace(talents) {
        const result = this.#talent.replace(talents);
        const contents = [];
        for(const id in result) {
            talents.push(result[id]);
            const source = this.#talent.get(id);
            const target = this.#talent.get(result[id]);
            contents.push({
                type: 'talentReplace',
                source, target
            });
        }
        return contents;
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
        return weightRandom(
            events.filter(
                ([eventId])=>this.#event.check(eventId, this.#property)
            )
        );
    }

    talentRandom() {
        const times = this.#property.get(this.#property.TYPES.TMS);
        const achievement = this.#property.get(this.#property.TYPES.CACHV);
        return this.#talent.talentRandom(this.getLastExtendTalent(), { times, achievement });
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
        const ticks = {};
        this.#property
            .get(this.#property.TYPES.ACHV)
            .forEach(([id, tick]) => ticks[id] = tick);
        return this
            .#achievement
            .list(this.#property)
            .sort((
                {id: a, grade: ag, hide: ah},
                {id: b, grade: bg, hide: bh}
            )=>{
                a = ticks[a];
                b = ticks[b];
                if(a&&b) return b - a;
                if(!a&&!b) {
                    if(ah&&bh) return bg - ag;
                    if(ah) return 1;
                    if(bh) return -1;
                    return bg - ag;
                }
                if(!a) return 1;
                if(!b) return -1;
            });
    }

    getTotal() {
        const TMS = this.#property.get(this.#property.TYPES.TMS);
        const CACHV = this.#property.get(this.#property.TYPES.CACHV);
        const CTLT = this.#property.get(this.#property.TYPES.CTLT);
        const CEVT = this.#property.get(this.#property.TYPES.CEVT);

        const totalTalent = this.#talent.count();
        const totalEvent = this.#event.count();

        return {
            times: TMS,
            achievement: CACHV,
            talentRate: CTLT / totalTalent,
            eventRate: CEVT / totalEvent,
        }
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

