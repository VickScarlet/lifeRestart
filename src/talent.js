import { clone } from './functions/util.js';
class Talent {
    constructor() {}

    #talents;

    initial({talents}) {
        this.#talents = talents;
        for(const id in talents) {
            const talent = talents[id];
            talent.id= Number(id);
            talent.grade = Number(talent.grade);
        }
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
        const { grade, name, description } = this.get(talentId)
        return { grade, name, description };
    }

    talentRandom() {
        // 1000, 100, 10, 1
        const talentList = {};
        for(const talentId in this.#talents) {
            const { id, grade, name, description } = this.#talents[talentId];
            if(!talentList[grade]) talentList[grade] = [{ grade, name, description, id }];
            else talentList[grade].push({ grade, name, description, id });
        }

        return new Array(10)
            .fill(1).map(()=>{
                const gradeRandom = Math.random();
                let grade;
                if(gradeRandom>=0.111) grade = 0;
                else if(gradeRandom>=0.011) grade = 1;
                else if(gradeRandom>=0.001) grade = 2;
                else grade = 3;

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

    do(talentId) {
        const { effect, condition, initiative, grade, name, description } = this.get(talentId);
        if(!initiative) return null;
        if(condition && !checkCondition(condition))
            return null;
        return { effect, grade, name, description };
    }
}

export default Talent;