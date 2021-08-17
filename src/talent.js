import { clone } from './functions/util.js';
class Talent {
    constructor() {}

    #talents;

    initial({talents}) {
        this.#talents = talents;
    }

    check(talentId) {
        const { condition } = this.get(talentId);
        return checkCondition(condition);
    }

    get(talentId) {
        const talent = this.#talents[talentId];
        if(!talent) throw new Error(`[ERROR] No Talent[${talentId}]`);
        return clone(talent);
    }

    information(talentId) {
        const { rate, name, description } = this.get(talentId)
        return { rate, name, description };
    }

    do(talentId) {
        const { effect, condition, initiative, rate, name, description } = this.get(talentId);
        if(!initiative) return null;
        if(condition && !checkCondition(condition))
            return null;
        return { effect, rate, name, description };
    }
}

export default Talent;