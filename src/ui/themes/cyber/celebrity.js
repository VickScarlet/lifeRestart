export default class CyberCelebrity extends ui.view.CyberTheme.CelebrityUI {
    constructor() {
        super();
        this.btnRetry.on(Laya.Event.CLICK, this, ()=>this.random());
        this.btnNext.on(Laya.Event.CLICK, this, this.next);
        this.panelCharacter.vScrollBar.elasticDistance = 150;
    }

    #selected;
    static #createComponent = Laya.plugin.extractComponents(CyberCelebrity.uiView, ['boxCharacter','boxTalent','boxUniqueUnGenerate']);
    #createCharacterItem(dataSource, click) {
        const {name, property, talent} = dataSource;
        const item = CyberCelebrity.#createComponent('boxCharacter');
        const vboxStates = item.getChildByName('vboxStates');
        const boxName = item.getChildByName('boxName');
        boxName.getChildByName('label').text = name;

        const p = $_.clone(property);
        for(const k in p)
            if(Math.abs(p[k] - Math.PI) < 0.0000001)
                p[k] = 'π';

        vboxStates.getChildByName('label').text = $_.format($lang.F_PropertyStr, p);
        for(const t of talent) {
            const i = CyberCelebrity.#createComponent('boxTalent');
            i.getChildByName('label').text = $_.format($lang.F_TalentSelection, t);
            i.y = vboxStates.height+vboxStates.space;
            let g = i.getChildByName(`grade${t.grade}`);
            if(g) g.visible = true;
            vboxStates.addChild(i);
        }
        const box = new Laya.Box();
        box.height = vboxStates.space;
        box.y = vboxStates.height;
        vboxStates.addChild(box);
        vboxStates.scaleY = 0;

        item.dataSource = dataSource;
        item.switch = showDetails => vboxStates.scaleY = !!showDetails?1:0;
        item.click = (cb, caller) => {
            boxName.offAll(Laya.Event.CLICK);
            boxName.on(Laya.Event.CLICK, caller || this, cb);
        }
        if(click) item.click(click);
        return item;
    }
    #createUniqueUnGenerateItem(generate) {
        const item = CyberCelebrity.#createComponent('boxUniqueUnGenerate');
        const boxName = item.getChildByName('boxName');
        const vboxStates = item.getChildByName('vboxStates');
        const label = vboxStates.getChildByName('label');
        const boxBtn = vboxStates.getChildByName('boxBtn');
        const btn = boxBtn.getChildByName('btn');

        label.event(Laya.Event.RESIZE);
        vboxStates.scaleY = 0;
        item.dataSource = false;
        item.switch = showDetails => vboxStates.scaleY = !!showDetails?1:0;
        item.click = (cb, caller) => {
            boxName.offAll(Laya.Event.CLICK);
            boxName.on(Laya.Event.CLICK, caller || this, cb);
        }
        item.generate = (cb, caller) => {
            btn.offAll(Laya.Event.CLICK);
            btn.on(Laya.Event.CLICK, caller || this, cb);
        }
        if(generate) item.generate(generate);
        return item;
    }


    init() {
        this.random();
    }

    close() {
        this.#selected = null;
        this.vboxCharacter.destroyChildren(true);
    }

    random(g) {
        this.#selected = null;
        this.vboxCharacter.destroyChildren(true);
        const {unique, normal} = core.characterRandom();
        const items = [];
        const uniqueItem = this.generateUnique(unique, ()=>{
            core.generateUnique();
            this.random(normal);

        });
        if(uniqueItem) items.push(uniqueItem);
        (g||normal).forEach(character => items.push(this.#createCharacterItem(character)));

        items.forEach((item, i) => {
            item.y = i;
            this.vboxCharacter.addChild(item);
            item.click(()=>{
                if(this.#selected) this.#selected.switch(false);
                this.#selected = item;
                item.switch(true);
                item.event(Laya.Event.RESIZE);
            })
        });
        if(g&&uniqueItem) {
            this.#selected = uniqueItem;
            uniqueItem.switch(true);
            uniqueItem.event(Laya.Event.RESIZE);
        }
    }

    generateUnique(data, generate) {
        if(!data) return null;
        if(!data.generate) return this.#createUniqueUnGenerateItem(generate);
        data.name = $lang.UI_UniqueWaTaShi;
        return this.#createCharacterItem(data);
    }

    next() {
        if(!this.#selected) return $$event('message', ['M_PleaseSelectOne']);
        if(!this.#selected.dataSource) return $$event('message', ['M_UnGenerate']);

        const {property: propertyAllocate, talent: talents} = this.#selected.dataSource;
        const replace = core.remake(talents.map(talent => talent.id));
        if(replace.length > 0) {
            $$event('message', [replace.map(v => ['F_TalentReplace', v])]);
        }
        $ui.switchView(
            UI.pages.TRAJECTORY,
            {
                propertyAllocate, talents,
                enableExtend: false,
            }
        );
    }

}