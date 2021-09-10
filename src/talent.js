import { clone } from './functions/util.js';
import { checkCondition, extractMaxTriggers } from './functions/condition.js';
import { getRate } from './functions/addition.js';

class Talent {
    constructor() {}

    #talents;

    initial({talents}) {
        this.#talents = talents;
        for(const id in talents) {
            const talent = talents[id];
            talent.id= Number(id);
            talent.grade = Number(talent.grade);
            talent.max_triggers = extractMaxTriggers(talent.condition);
        }
    }

    count() {
        return Object.keys(this.#talents).length;
    }

    check(talentId, property) {
        const { condition } = this.get(talentId);
        return checkCondition(property, condition);
    }

    get(talentId) {
        const talent = this.#talents[talentId];
        if(!talent) throw new Error(`[ERROR] No Talent[${talentId}]`);
        return clone(talent);
    }

    information(talentId) {
        const { grade, name, description } = this.get(talentId)
        return { grade, name, description };
    }

    exclusive(talends, exclusiveId) {
        const { exclusive } = this.get(exclusiveId);
        if(!exclusive) return null;
        for(const talent of talends) {
            for(const e of exclusive) {
                if(talent == e) return talent;
            }
        }
        return null;
    }

    talentRandom(include, {times = 0, achievement = 0} = {}) {
        const rate = { 1:100, 2:10, 3:1, };
        const rateAddition = { 1:1, 2:1, 3:1, };
        const timesRate = getRate('times', times);
        const achievementRate = getRate('achievement', achievement);

        for(const grade in timesRate)
            rateAddition[grade] += timesRate[grade] - 1;

        for(const grade in achievementRate)
            rateAddition[grade] += achievementRate[grade] - 1;

        for(const grade in rateAddition)
            rate[grade] *= rateAddition[grade];

        const randomGrade = () => {
            let randomNumber = Math.floor(Math.random() * 1000);
            if((randomNumber -= rate[3]) < 0) return 3;
            if((randomNumber -= rate[2]) < 0) return 2;
            if((randomNumber -= rate[1]) < 0) return 1;
            return 0;
        }

        // 1000, 100, 10, 1
        const talentList = {};
        for(const talentId in this.#talents) {
            const { id, grade, name, description } = this.#talents[talentId];
            if(id == include) {
                include = { grade, name, description, id };
                continue;
            }
            if(!talentList[grade]) talentList[grade] = [{ grade, name, description, id }];
            else talentList[grade].push({ grade, name, description, id });
        }

        return new Array(10)
            .fill(1).map((v, i)=>{
                if(!i && include) return include;
                let grade = randomGrade();
                while(talentList[grade].length == 0) grade--;
                const length = talentList[grade].length;

                const random = Math.floor(Math.random()*length) % length;
                return talentList[grade].splice(random,1)[0];
            });
    }

    allocationAddition(talents) {
        if(Array.isArray(talents)) {
            let addition = 0;
            for(const talent of talents)
                addition += this.allocationAddition(talent);
            return addition;
        }
        return Number(this.get(talents).status) || 0;
    }

    do(talentId, property) {
        const { effect, condition, grade, name, description } = this.get(talentId);
        if(condition && !checkCondition(property, condition))
            return null;
        return { effect, grade, name, description };
    }
}

export default Talent;