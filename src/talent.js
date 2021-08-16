class Talent {
    constructor(initialData={}) {
        this.initial(initialData);
    }

    initial({talent}) {
        this.#talent = talent;
    }

    check(talentId) {
        const { condition } = this.get(talentId);
        return checkCondition(condition);
    }

    get(talentId) {
        const talent = this.#talent[talentId];
        if(!talent) throw new Error(`[ERROR] No Talent[${talentId}]`);
        return clone(talent);
    }

    description(talentId) {
        return this.get(talentId).description;
    }

    do(talentId) {
        const { effect, condition } = this.get(talentId);
        if(condition && !checkCondition(condition))
            return null;
        return { effect };
    }
}

export default Talent;