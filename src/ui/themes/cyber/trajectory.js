export default class CyberTrajectory extends ui.view.CyberTheme.CyberTrajectoryUI {
    constructor() {
        super();
        let pos1 = [0, 0];
        this.panelTrajectory.on(Laya.Event.MOUSE_DOWN, this, e => pos1 = [e.stageX, e.stageY]);
        this.panelTrajectory.on(Laya.Event.MOUSE_UP, this, e => {
            const distanceX = e.stageX - pos1[0];
            const distanceY = e.stageY - pos1[1];
            if(Math.sqrt(Math.abs(distanceX) + Math.abs(distanceY)) > 10) {
                return;
            }
            this.onNext();
        });
        this.btnSummary.on(Laya.Event.CLICK, this, this.onSummary);

        this.panelTrajectory.vScrollBar.elasticDistance = 150;

        let interval = null;
        let timeout = null;

        const scroll = alter => {
            let value = this.panelTrajectory.vScrollBar.value + alter;
            if(value < 0) value = 0;
            if(value > this.panelTrajectory.vScrollBar.max) value = this.panelTrajectory.vScrollBar.max;
            this.panelTrajectory.scrollTo(0, value);
        }
        const on = (btn, alter) => {
            btn.off(Laya.Event.CLICK, this, scroll);
            btn.on(Laya.Event.CLICK, this, scroll, [100*alter]);
            timeout = setTimeout(() => {
                btn.off(Laya.Event.CLICK, this, scroll);
                interval = setInterval(() => scroll(10*alter), 10);
            }, 100);
        }
        const clear = () => {
            if(interval) {
                clearInterval(interval);
                interval = null;
            }
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };
        this.btnUp.on(Laya.Event.MOUSE_DOWN, this, on, [this.btnUp, -1]);
        this.btnDown.on(Laya.Event.MOUSE_DOWN, this, on, [this.btnDown, 1]);
        this.btnUp.on(Laya.Event.MOUSE_UP, this, clear);
        this.btnUp.on(Laya.Event.MOUSE_OUT, this, clear);
        this.btnDown.on(Laya.Event.MOUSE_UP, this, clear);
        this.btnDown.on(Laya.Event.MOUSE_OUT, this, clear);
        this.scbSpeed.on(Laya.Event.CHANGE, this, () => this.speed = this.scbSpeed.value);
        this.scbSpeed.on(Laya.Event.MOUSE_UP, this, () => this.onNext());
    }

    #speed;
    #auto;

    static #createComponent = Laya.plugin.extractComponents(CyberTrajectory.uiView, ['boxTrajectoryItem']);
    #createTrajectoryItem() {
        const item = CyberTrajectory.#createComponent('boxTrajectoryItem');
        item.labContent = item.getChildByName('labContent');
        item.labAge = item.getChildByName('hboxAge').getChildByName('labAge');
        item.boxGrade = item.getChildByName('boxGrade');
        return item;
    }
    #isEnd;
    #trajectoryItems;
    #talents;
    #enableExtend;

    init({propertyAllocate, talents, enableExtend}) {
        this.#enableExtend = enableExtend;
        this.boxParticle.visible = false;
        this.boxSpeed.visible = true;
        this.btnSummary.visible = false;
        this.#trajectoryItems = [];
        this.#isEnd = false;
        this.#talents = talents;
        core.start(propertyAllocate);
        this.updateProperty();
        this.onNext();
    }

    close() {
        this.scbSpeed.value = 0;
        this.speed = 0;
        this.#trajectoryItems.forEach(item => {
            item.removeSelf();
            item.destroy();
        });
        this.#trajectoryItems = null;
    }

    updateProperty() {
        const types = core.PropertyTypes;
        const propertys = core.propertys;

        this.labCharm.text = propertys[types.CHR];
        this.labIntelligence.text = propertys[types.INT];
        this.labStrength.text = propertys[types.STR];
        this.labMoney.text = propertys[types.MNY];
        this.labSpirit.text = propertys[types.SPR];
    }

    onNext() {
        if(this.#isEnd) return;

        const { age, content, isEnd } = core.next();
        this.#isEnd = isEnd;

        if(isEnd) {
            this.boxSpeed.visible = false;
            this.btnSummary.visible = true;
            Laya.timer.frameOnce(1,this,()=>{
                this.panelTrajectory.scrollTo(0, this.panelTrajectory.contentHeight);
            });
        }
        this.panelTrajectory.scrollTo(0, this.panelTrajectory.contentHeight);
        this.renderTrajectory(age, content);

        if(age >= 100) {
            this.boxParticle.visible = true;
        }
        this.updateProperty();
    }

    renderTrajectory(age, content) {
        const item = this.#createTrajectoryItem();
        item.labAge.text = ''+age;
        item.labContent.text = content.map(
            ({type, description, grade, name, postEvent}) => {
                switch(type) {
                    case 'TLT':
                        return `天赋【${name}】发动：${description}`;
                    case 'EVT':
                        return description + (postEvent?`\n${postEvent}`:'');
                }
            }
        ).join('\n');
        $_.deepMapSet(
            item.boxGrade,
            $ui.common.gradeBlk[content[content.length - 1].grade || 0]
        );
        this.vboxTrajectory.addChild(item);
        this.#trajectoryItems.push(item);
        item.y = this.vboxTrajectory.height;
    }

    onSummary() {
        const talents = this.#talents;
        $ui.switchView(UI.pages.SUMMARY, { talents, enableExtend: this.#enableExtend });
    }

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
        this.prgSpeed.value = speed / this.scbSpeed.max;
        clearInterval(this.#auto);
        this.#auto = null;
        if(!speed) return;
        this.#auto = setInterval(
            () => this.onNext(),
            3000 * (1 - this.prgSpeed.value) + 300
        );
    }
}