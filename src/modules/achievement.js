class Achievement {
    constructor(system) {
        this.#system = system;
    }

    // 时机
    Opportunity = {
        START: "START",             // 分配完成点数，点击开始新人生后
        TRAJECTORY: "TRAJECTORY",   // 每一年的人生经历中
        SUMMARY: "SUMMARY",         // 人生结束，点击人生总结后
        END: "END",                 // 游戏完成，点击重开 重开次数在这之后才会+1
    };

    #system;
    #achievements;

    initial({achievements}) {
        this.#achievements = achievements;
        return this.count;
    }

    get count() {
        return Object.keys(this.#achievements).length;
    }

    get #prop() {
        return this.#system.request(this.#system.Module.PROPERTY);
    }

    list() {
        return Object
            .values(this.#achievements)
            .map(({
                id, name, opportunity,
                description, hide, grade,
            })=>({
                id, name, opportunity,
                description, hide, grade,
                isAchieved: this.isAchieved(id, this.#prop),
            }));
    }

    get(achievementId) {
        const achievement = this.#achievements[achievementId];
        if(!achievement) throw new Error(`[ERROR] No Achievement[${achievementId}]`);
        return this.#system.clone(achievement);
    }

    check(achievementId) {
        const { condition } = this.get(achievementId);
        return this.#system.check(condition);
    }

    isAchieved(achievementId) {
        for(const [achieved] of (this.#prop.get(this.#prop.TYPES.ACHV)||[]))
            if(achieved == achievementId) return true;
        return false;
    }

    achieve(opportunity) {
        this.list()
            .filter(({isAchieved})=>!isAchieved)
            .filter(({opportunity: o})=>o==opportunity)
            .filter(({id})=>this.check(id, this.#prop))
            .forEach(({id})=>{
                this.#prop.achieve(this.#prop.TYPES.ACHV, id)
                $$event('achievement', this.get(id))
            });
    }
}

export default Achievement;