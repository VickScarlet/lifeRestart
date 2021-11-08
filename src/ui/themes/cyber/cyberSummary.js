export default class cyberSummary extends CyberSummaryUI {
    constructor() {
        super();
        this.listSelectedTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
    }

    init({talents}) {
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