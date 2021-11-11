import { clone, weightRandom, getListValuesMap, getConvertedMap } from '../functions/util.js'
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
    #defaultPropertyPoints;
    #talentSelectLimit;
    #propertyAllocateLimit;
    #defaultPropertys;

    async initial(loadJSON) {
        const [age, talents, events, achievements] = await Promise.all([
            loadJSON('age'),
            loadJSON('talents'),
            loadJSON('events'),
            loadJSON('achievement'),
        ]);

        const total = {
            [this.PropertyTypes.TACEV]: this.#achievement.initial({achievements}),
            [this.PropertyTypes.TEVT]: this.#event.initial({events}),
            [this.PropertyTypes.TTLT]: this.#talent.initial({talents}),
        };

        this.#property.initial({age, total});
    }

    config({
        defaultPropertyPoints = 20, // default number of points for a property
        talentSelectLimit = 3, // max number of talents that can be selected
        propertyAllocateLimit = [0, 10], // scoop of properties that can be allocated
        defaultPropertys = {}, // default propertys
        talentConfig, // config for talent
        propertyConfig, // config for property
    } = {}) {
        this.#defaultPropertyPoints = defaultPropertyPoints;
        this.#talentSelectLimit = talentSelectLimit;
        this.#propertyAllocateLimit = propertyAllocateLimit;
        this.#defaultPropertys = defaultPropertys;
        this.#talent.config(talentConfig);
        this.#property.config(propertyConfig);
    }

    restart(allocation) {
        const propertys = clone(this.#defaultPropertys);
        for(const key in allocation) {
            propertys[key] = clone(allocation[key]);
        }
        this.#triggerTalents = {};
        const contents = this.talentReplace(propertys.TLT);
        this.#property.restart(propertys);
        this.doTalent()
        this.#property.restartLastStep();
        this.#achievement.achieve(
            this.AchievementOpportunity.START,
            this.#property
        )
        return contents;
    }

    getPropertyPoints(selectedTalentIds) {
        return this.#defaultPropertyPoints + this.#talent.allocationAddition(selectedTalentIds);
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
            this.AchievementOpportunity.TRAJECTORY,
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
        if(talents) this.#property.change(this.PropertyTypes.TLT, talents);
        talents = this.#property.get(this.PropertyTypes.TLT)
            .filter(talentId => this.getTalentCurrentTriggerCount(talentId) < this.#talent.get(talentId).max_triggers);

        const contents = [];
        for(const talentId of talents) {
            const result = this.#talent.do(talentId, this.#property);
            if(!result) continue;
            this.#triggerTalents[talentId] = this.getTalentCurrentTriggerCount(talentId) + 1;
            const { effect, name, description, grade } = result;
            contents.push({
                type: this.PropertyTypes.TLT,
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
        this.#property.change(this.PropertyTypes.EVT, eventId);
        this.#property.effect(effect);
        const content = {
            type: this.PropertyTypes.EVT,
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
        return this.#talent.talentRandom(
            this.lastExtendTalent,
            this.#getPropertys(
                this.PropertyTypes.TMS,
                this.PropertyTypes.CACHV,
            )
        );
    }

    talentExtend(talentId) {
        this.#property.set(this.PropertyTypes.EXT, talentId);
    }

    exclusive(talents, exclusive) {
        return this.#talent.exclusive(talents, exclusive);
    }

    #getJudges(...types) {
        return getListValuesMap(types.flat(), key => this.#property.judge(key));
    }

    #getPropertys(...types) {
        return getListValuesMap(types.flat(), key => this.#property.get(key));
    }

    get lastExtendTalent() {
        return this.#property.get(this.PropertyTypes.EXT);
    }

    get summary() {
        this.#achievement.achieve(
            this.AchievementOpportunity.SUMMARY,
            this.#property
        )

        const pt = this.PropertyTypes;

        return this.#getJudges(pt.SUM,
            pt.HAGE, pt.HCHR, pt.HINT,
            pt.HSTR, pt.HMNY, pt.HSPR,
        );
    }

    get status() {
        const pt = this.PropertyTypes;

        return this.#getJudges( pt.TMS,
            pt.CACHV, pt.RTLT, pt.REVT,
        );
    }
    get achievements() {
        const ticks = {};
        this.#property
            .get(this.PropertyTypes.ACHV)
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

    get PropertyTypes() { return this.#property.TYPES; }
    get AchievementOpportunity() { return this.#achievement.Opportunity; }
    get talentSelectLimit() { return this.#talentSelectLimit; }
    get propertyAllocateLimit() { return clone(this.#propertyAllocateLimit); }

    get propertys() { return this.#property.getPropertys(); }
    get times() { return this.#property.get(this.PropertyTypes.TMS) || 0; }
    set times(v) {
        this.#property.set(this.PropertyTypes.TMS, v);
        this.#achievement.achieve(
            this.AchievementOpportunity.END,
            this.#property
        )
    }
}

export default Life;