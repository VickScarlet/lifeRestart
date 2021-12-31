export default class CyberAchievement extends ui.view.CyberTheme.CyberAchievementUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, () => $ui.switchView(UI.pages.MAIN));
        const min = Math.min(this.btnAchievement.fontSize, this.btnStatistics.fontSize);
        const max = Math.max(this.btnAchievement.fontSize, this.btnStatistics.fontSize);
        this.#state = {min, max};
        this.btnStatistics.on(Laya.Event.CLICK, this, ()=>this.switch('statistics'));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>this.switch('achievement'));
        this.btnRank.on(Laya.Event.CLICK, this, $$event, ['message', ['M_NoRank']]);

        this.listAchievements.renderHandler = new Laya.Handler(this, this.onRenderAchievement);
        this.listAchievements.scrollBar.elasticDistance = 150;
        this.on(Laya.Event.RESIZE, this, () => {
            this.boxPage.width = 2 * this.width;
            this.boxA.width = this.boxB.width = this.width;
            if(this.boxPage.x < 0) {
                this.boxPage.x = - this.width;
            }

            const renderWidth = this.listAchievements?._itemRender?.props?.width;
            if(renderWidth) {
                const col = Math.max(Math.floor((this.width - 65) / renderWidth), 1);
                this.listAchievements.width = col * renderWidth + (col - 1) * (this.listAchievements.spaceY || 0) + 30;
            }
        });
    }

    #state;
    #tweens;

    init() {
        this.switch('statistics', 0);

        const {statistics, achievements, PropertyTypes: pt} = core;

        this.listAchievements.array = achievements;

        this.labRemakeTimes.text = statistics[pt.TMS].value;
        this.labRemakeTimesJudge.text = statistics[pt.TMS].judge;
        this.labAchievementCountJudge.color = $ui.common.grade[statistics[pt.TMS].grade];

        this.labAchievementCount.text = statistics[pt.CACHV].value;
        this.labAchievementCountJudge.text = statistics[pt.CACHV].judge;
        this.labAchievementCountJudge.color = $ui.common.grade[statistics[pt.CACHV].grade];

        this.labEventRate.text = parseInt(statistics[pt.REVT].value*100)+'%';
        this.prgEventRate.value = statistics[pt.REVT].value;

        this.labTalentRate.text = parseInt(statistics[pt.RTLT].value*100)+'%';
        this.prgTalentRate.value = statistics[pt.RTLT].value;
    }

    switch(page, time=300) {
        if(this.#tweens) {
            this.#tweens.forEach(tween => Laya.Tween.clear(tween));
        }
        this.#tweens = [];

        switch (page) {
            case 'statistics':
                time = - this.boxPage.x / this.width * time;
                this.#tweens.push(
                    Laya.Tween.to(this.boxPage, {x: 0}, time, Laya.Ease.backOut, Laya.Handler.create(this, () => this.#tweens = null)),
                    Laya.Tween.to(this.btnStatistics, {fontSize: this.#state.max, anchorX: 0.5, anchorY: 1}, time, Laya.Ease.backOut),
                    Laya.Tween.to(this.btnAchievement, {fontSize: this.#state.min, anchorX: 0.5, anchorY: 1}, time, Laya.Ease.backOut),
                );
                break;
            case 'achievement':
                time = (this.width + this.boxPage.x) / this.width * time;
                this.#tweens.push(
                    Laya.Tween.to(this.boxPage, {x: - this.width}, time, Laya.Ease.backOut, Laya.Handler.create(this, () => this.#tweens = null)),
                    Laya.Tween.to(this.btnStatistics, {fontSize: this.#state.min, anchorX: 0.5, anchorY: 1}, time, Laya.Ease.backOut),
                    Laya.Tween.to(this.btnAchievement, {fontSize: this.#state.max, anchorX: 0.5, anchorY: 1}, time, Laya.Ease.backOut),
                );
                break;
        }
    }

    onRenderAchievement(box, index) {
        const dataSource = box.dataSource;

        const name = box.getChildByName('name');
        const description = box.getChildByName('description');
        const completed = box.getChildByName('completed');
        const uncomplete = box.getChildByName('uncomplete');

        if(dataSource.isAchieved) {
            name.text = dataSource.name;
            description.text = dataSource.description;
            completed.visible = true;
            uncomplete.visible = false;
        } else {
            name.text = dataSource.hide? '???': dataSource.name;
            description.text = dataSource.hide? '???': dataSource.description;
            completed.visible = false;
            uncomplete.visible = true;
        }

        box.colorFilter = $ui.gradeFilter(dataSource.grade);
    }
}