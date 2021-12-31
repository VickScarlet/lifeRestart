export default class Achievement extends ui.view.DefaultTheme.AchievementUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, () => $ui.switchView(UI.pages.MAIN));
        this.btnRank.on(Laya.Event.CLICK, this, $$event, ['message', ['M_NoRank']]);
        this.listAchievements.renderHandler = new Laya.Handler(this, this.onRenderAchievement);
        this.listAchievements.scrollBar.elasticDistance = 150;
    }

    init() {

        const {statistics, achievements, PropertyTypes: pt} = core;

        this.listAchievements.array = achievements;

        this.labRemakeTimes.text = $_.format($lang.F_RemakeTimes, statistics[pt.TMS].value);
        this.labRemakeTimesJudge.text = statistics[pt.TMS].judge;
        $_.deepMapSet(this.boxRemakeTimes, $ui.common.achievement[statistics[pt.TMS].grade]);

        this.labAchievementCount.text = $_.format($lang.F_AchievementCount, statistics[pt.CACHV].value);
        this.labAchievementCountJudge.text = statistics[pt.CACHV].judge;
        $_.deepMapSet(this.boxAchievementCount, $ui.common.achievement[statistics[pt.CACHV].grade]);

        this.labEventRate.text = parseInt(statistics[pt.REVT].value*100)+'%';
        this.prgEventRate.scaleX = statistics[pt.REVT].value;
        $_.deepMapSet(this.boxEventRate, $ui.common.achievement[statistics[pt.REVT].grade]);

        this.labTalentRate.text = parseInt(statistics[pt.RTLT].value*100)+'%';
        this.prgTalentRate.scaleX = statistics[pt.RTLT].value;
        $_.deepMapSet(this.boxTalentRate, $ui.common.achievement[statistics[pt.RTLT].grade]);
    }

    onRenderAchievement(box) {
        const dataSource = box.dataSource;

        const name = box.getChildByName('name');
        const description = box.getChildByName('description');
        const boxMask = box.getChildByName('boxMask');

        $_.deepMapSet(box, $ui.common.achievement[dataSource.grade]);
        name.color = description.color = $ui.common.defaultFontColor;

        if(dataSource.isAchieved) {
            name.text = dataSource.name;
            description.text = dataSource.description;
            boxMask.visible = false;
        } else {
            name.text = dataSource.hide? '???': dataSource.name;
            description.text = dataSource.hide? '???': dataSource.description;
            boxMask.visible = true;
        }
    }
}