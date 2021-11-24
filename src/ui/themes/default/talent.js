export default class Talent extends TalentUI {
    constructor() {
        super();
        this.btnDrawCard.on(Laya.Event.CLICK, this, this.onClickDrawCard);
        this.btnNext.on(Laya.Event.CLICK, this, this.onClickNext);
        this.listTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
        this.listTalents.scrollBar.elasticDistance = 150;
    }

    #selected = new Set();

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
            return;
        }

        const talents = [...this.#selected].map(index => this.listTalents.array[index]);
        $ui.switchView(UI.pages.PROPERTY, { talents });
    }

    renderTalent(box, index) {
        const dataSource = box.dataSource;

        box.label = `${dataSource.name}(${dataSource.description})`;
        const style = $ui.common.card[dataSource.grade];

        $_.mapSet(box, this.#selected.has(index)? style.selected: style.normal);

        box.offAll(Laya.Event.CLICK);
        box.on(Laya.Event.CLICK, this, () => {
            if(this.#selected.has(index)) {
                this.#selected.delete(index);
            } else {
                if(this.#selected.size >= core.talentSelectLimit) {
                    return;
                }
                this.#selected.add(index);
            }

            this.btnNext.label = this.#selected.size === core.talentSelectLimit
                ? 'UI_Next'
                : 'UI_Talent_Select_Uncomplete';

            $_.mapSet(box, this.#selected.has(index)? style.selected: style.normal);
        });
    }
}