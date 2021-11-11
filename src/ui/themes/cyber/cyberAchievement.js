export default class cyberAchievement extends CyberAchievementUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, () => UIManager.getInstance().switchView(UIManager.getInstance().themes.MAIN));
    }

    init() {
        const status = core.status;
    }
}