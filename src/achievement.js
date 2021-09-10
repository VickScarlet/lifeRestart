import { clone } from './functions/util.js';
import { checkCondition } from './functions/condition.js';

class Achievement {
    constructor() {}

    // 时机
    Opportunity = {
        START: "START",             // 分配完成点数，点击开始新人生后
        TRAJECTORY: "TRAJECTORY",   // 每一年的人生经历中
        SUMMARY: "SUMMARY",         // 人生结束，点击人生总结后
        END: "END",                 // 游戏完成，点击重开 重开次数在这之后才会+1
    };

    #achievements;

    initial({achievements}) {
        this.#achievements = achievements;
    }

    count() {
        return Object.keys(this.#achievements).length;
    }

    list(property) {
        return Object
            .values(this.#achievements)
            .map(({
                id, name, opportunity,
                description, hide, grade,
            })=>({
                id, name, opportunity,
                description, hide, grade,
                isAchieved: this.isAchieved(id, property),
            }));
    }

    get(achievementId) {
        const achievement = this.#achievements[achievementId];
        if(!achievement) throw new Error(`[ERROR] No Achievement[${achievementId}]`);
        return clone(achievement);
    }

    check(achievementId, property) {
        const { condition } = this.get(achievementId);
        return checkCondition(property, condition);
    }

    isAchieved(achievementId, property) {
        for(const [achieved] of (property.get(property.TYPES.ACHV)||[]))
            if(achieved == achievementId) return true;
        return false;
    }

    achieve(opportunity, property) {
        this.list(property)
            .filter(({isAchieved})=>!isAchieved)
            .filter(({opportunity: o})=>o==opportunity)
            .filter(({id})=>this.check(id, property))
            .forEach(({id})=>{
                property.achieve(property.TYPES.ACHV, id)
                $$event('achievement', this.get(id))
            });
    }
}

export default Achievement;