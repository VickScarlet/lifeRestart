(function (window){
    function Life(){
        this.property = new Property();
        this.event = new Event();
        this.talent = new Talent();
        this.triggerTalents = [];
    }
    Life.prototype = {
        initial(cb) {
            json('age',function (age){
                this.property.initial(age.data);
                json('talents',function (talents){
                    this.talent.initial(talents.data);
                    json('events',function (events){
                        this.event.initial(events.data);
                        cb(true);
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        },

        restart(allocation) {
            this.triggerTalents = [];
            this.property.restart(allocation);
            this.doTalent();
            this.property.recordList();
        },

        getTalentAllocationAddition(talents) {
            return this.talent.allocationAddition(talents);
        },

        next() {
            const {age, event, talent} = this.property.ageNext();

            const talentContent = this.doTalent(talent);
            const eventContent = this.doEvent(this.random(event));
            this.property.recordList();

            const isEnd = this.property.isEnd();

            const content = [talentContent, eventContent].flat();
            return { age, content, isEnd };
        },

        doTalent(talents) {
            if(talents) this.property.change(this.property.TYPES.TLT, talents);
            talents = this.property.get(this.property.TYPES.TLT).filter(function(talentId){
                return!~this.triggerTalents.indexOf(talentId);
            }.bind(this));

            const contents = [];
            for(const talentId of talents) {
                const result = this.talent.do(talentId, this.property);
                if(!result) continue;
                this.triggerTalents.push(talentId);
                const { effect, name, description, grade } = result;
                contents.push({
                    type: this.property.TYPES.TLT,
                    name,
                    grade,
                    description,
                });
                if(!effect) continue;
                this.property.effect(effect);
            }
            return contents;
        },

        doEvent(eventId) {
            const { effect, next, description, postEvent } = this.event.do(eventId, this.property);
            this.property.change(this.property.TYPES.EVT, eventId);
            this.property.effect(effect);
            const content = {
                type: this.property.TYPES.EVT,
                description,
                postEvent,
            };
            if(next) return [content, this.doEvent(next)].flat();
            return [content];
        },

        random(events) {
            events = events.filter(([eventId])=>this.event.check(eventId, this.property));

            let totalWeights = 0;
            for(const [, weight] of events)
                totalWeights += weight;

            let random = Math.random() * totalWeights;
            for(const [eventId, weight] of events)
                if((random-=weight)<0)
                    return eventId;
            return events[events.length-1];
        },

        talentRandom() {
            return this.talent.talentRandom(JSON.parse(localStorage.extendTalent||'null'));
        },

        talentExtend(talentId) {
            localStorage.extendTalent = JSON.stringify(talentId);
        },

        getRecord() {
            return this.property.getRecord();
        },

        exclusive(talents, exclusive) {
            return this.talent.exclusive(talents, exclusive);
        }
    };
    window.Life = Life;
})(window);


