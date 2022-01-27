export default class CyberTalent extends ui.view.CyberTheme.CyberTalentUI {
    constructor() {
        super();
        this.btnDrawCard.on(Laya.Event.CLICK, this, this.onClickDrawCard);
        this.btnNext.on(Laya.Event.CLICK, this, this.onClickNext);
        this.listTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
        this.listTalents.scrollBar.elasticDistance = 150;
        this.on(Laya.Event.RESIZE, this, () => {
            const renderWidth = this.listTalents?._itemRender?.props?.width;
            if(renderWidth) {
                const col = Math.max(Math.floor((this.width - 40) / renderWidth), 1);
                this.listTalents.width = col * renderWidth + (col - 1) * (this.listTalents.spaceY || 0);
            }
        });
    }

    #selected = new Set();
    static load() {
        return ['images/background/background_2@3x.png'];
    }

    init() {
        this.pageDrawCard.visible = true;
        this.pageResult.visible = false;
        this.btnNext.label = 'UI_Talent_Select_Uncomplete';
        this.#selected.clear();
    }

    close() {}

    onClickDrawCard() {
        this.pageDrawCard.visible = false;
        this.pageResult.visible = true;
        this.listTalents.array = core.talentRandom();
    }

    onClickNext() {
        if(this.#selected.size < core.talentSelectLimit) {
            return $$event('message', ['F_TalentSelectNotComplect', core.talentSelectLimit]);
        }

        const talents = [...this.#selected].map(index => this.listTalents.array[index]);
        $ui.switchView(UI.pages.PROPERTY, { talents, enableExtend: true});
    }

    renderTalent(box, index) {
        const dataSource = box.dataSource;

        const hboxTitle = box.getChildByName("hboxTitle");
        const labTitle = hboxTitle.getChildByName("labTitle");
        const grades = hboxTitle.getChildByName("grades");
        const grade1 = grades.getChildByName("grade1");
        const grade2 = grades.getChildByName("grade2");
        const grade3 = grades.getChildByName("grade3");
        const labDescription = box.getChildByName("labDescription");
        const unselected = box.getChildByName("unselected");
        const selected = box.getChildByName("selected");


        switch (dataSource.grade) {
            case 1:
                grades.x = 0;
                labTitle.x = 1;
                grade1.visible = true;
                grade2.visible = false;
                grade3.visible = false;
                break;
            case 2:
                grades.x = 0;
                labTitle.x = 1;
                grade1.visible = false;
                grade2.visible = true;
                grade3.visible = false;
                break;
            case 3:
                grades.x = 0;
                labTitle.x = 1;
                grade1.visible = false;
                grade2.visible = false;
                grade3.visible = true;
                break;
            default:
                grades.x = 1;
                labTitle.x = 0;
                grade1.visible = false;
                grade2.visible = false;
                grade3.visible = false;
                break;
        }
        labTitle.text = dataSource.name;
        labTitle.event(Laya.Event.RESIZE);
        labDescription.text = dataSource.description;
        unselected.visible = !( selected.visible = this.#selected.has(index) );
        box.offAll(Laya.Event.CLICK);
        box.on(Laya.Event.CLICK, this, () => {
            if(this.#selected.has(index)) {
                this.#selected.delete(index);
            } else {
                if(this.#selected.size >= core.talentSelectLimit) {
                    return $$event('message', ['F_TalentSelectLimit', core.talentSelectLimit]);
                }
                const exclusive = core.exclude(
                    [...this.#selected].map(index => this.listTalents.array[index].id),
                    this.listTalents.array[index].id
                );
                if(exclusive != null) {
                    for(const {name, id} of this.listTalents.array)
                        if(exclusive == id)
                            return $$event('message', ['F_TalentConflict', name]);
                    return;
                }
                this.#selected.add(index);
            }

            this.btnNext.label = this.#selected.size === core.talentSelectLimit
                ? 'UI_Next'
                : 'UI_Talent_Select_Uncomplete';
            unselected.visible = !( selected.visible = this.#selected.has(index) );
        });
    }
}