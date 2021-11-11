export default class cyberSummary extends CyberSummaryUI {
    constructor() {
        super();
        this.listSelectedTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
        this.btnAgain.on(Laya.Event.CLICK, this, this.onAgain);
    }

    get gradeFilters() {
        return [
            this.colorGrade0.text,
            this.colorGrade1.text,
            this.colorGrade2.text,
            this.colorGrade3.text,
        ];
    }

    get gradeColors() {
        return [
            this.colorGrade0.color,
            this.colorGrade1.color,
            this.colorGrade2.color,
            this.colorGrade3.color,
        ];
    }

    onAgain() {
        UIManager.getInstance().switchView(UIManager.getInstance().themes.MAIN);
        core.times ++;
    }

    init({talents}) {
        const {summary, lastExtendTalent} = core;
        const gradeFilters = this.gradeFilters;
        const gradeColors = this.gradeColors;

        console.debug(summary, lastExtendTalent);
        const age = summary[core.PropertyTypes.HAGE];
        this.labAge.text = ''+age.value;
        this.labAgeJudge.text = age.judge;
        this.labAgeJudge.color = gradeColors[age.grade];

        const sum = summary[core.PropertyTypes.SUM];
        this.labTotal.text = ''+sum.value;
        this.labTotalJudge.text = sum.judge;
        this.labTotalJudge.color = gradeColors[sum.grade];

        const chr = summary[core.PropertyTypes.HCHR];
        this.labCharm.text = ''+chr.value;
        this.prgCharm.value = chr.progress;
        this.labCharmJudge.text = chr.judge;
        this.labCharmJudge.color = gradeColors[chr.grade];
        this.boxCharmGrade.colorFilter = gradeFilters[chr.grade];

        const int = summary[core.PropertyTypes.HINT];
        this.labIntelligence.text = ''+int.value;
        this.prgIntelligence.value = int.progress;
        this.labIntelligenceJudge.text = int.judge;
        this.labIntelligenceJudge.color = gradeColors[int.grade];
        this.boxIntelligenceGrade.colorFilter = gradeFilters[int.grade];

        const str = summary[core.PropertyTypes.HSTR];
        this.labStrength.text = ''+str.value;
        this.prgStrength.value = str.progress;
        this.labStrengthJudge.text = str.judge;
        this.labStrengthJudge.color = gradeColors[str.grade];
        this.boxStrengthGrade.colorFilter = gradeFilters[str.grade];

        const mny = summary[core.PropertyTypes.HMNY];
        this.labMoney.text = ''+mny.value;
        this.prgMoney.value = mny.progress;
        this.labMoneyJudge.text = mny.judge;
        this.labMoneyJudge.color = gradeColors[mny.grade];
        this.boxMoneyGrade.colorFilter = gradeFilters[mny.grade];

        const spr = summary[core.PropertyTypes.HSPR];
        this.labSpirit.text = ''+spr.value;
        this.prgSpirit.value = spr.progress;
        this.labSpiritJudge.text = spr.judge;
        this.labSpiritJudge.color = gradeColors[spr.grade];
        this.boxSpiritGrade.colorFilter = gradeFilters[spr.grade];

        talents.sort(({id:a, grade:ag}, {id:b, grade:bg},)=>{
            if(a == lastExtendTalent) return -1;
            if(b == lastExtendTalent) return 1;
            return bg - ag;
        });
        this.listSelectedTalents.array = talents;
    }

    renderTalent(box, index) {
        const dataSource = box.dataSource;
        console.debug(index, dataSource, box);

        const labTitle = box.getChildByName("labTitle");
        const grade1 = box.getChildByName("grade1");
        const grade2 = box.getChildByName("grade2");
        const grade3 = box.getChildByName("grade3");
        const labDescription = box.getChildByName("labDescription");

        labTitle.text = dataSource.name;
        labDescription.text = dataSource.description;
        switch (dataSource.grade) {
            case 1:
                grade1.visible = true;
                grade2.visible = false;
                grade3.visible = false;
                break;
            case 2:
                grade1.visible = false;
                grade2.visible = true;
                grade3.visible = false;
                break;
            case 3:
                grade1.visible = false;
                grade2.visible = false;
                grade3.visible = true;
                break;
            default:
                grade1.visible = false;
                grade2.visible = false;
                grade3.visible = false;
                break;
        }
    }
}