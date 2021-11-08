export default class cyberMain extends CyberMainUI {
    constructor() {
        super();
        this.btnRemake.on(Laya.Event.CLICK, this, ()=>UIManager.getInstance().switchView(UIManager.getInstance().themes.TALENT));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>UIManager.getInstance().switchView(UIManager.getInstance().themes.ACHIEVEMENT));
        this.btnThanks.on(Laya.Event.CLICK, this, ()=>UIManager.getInstance().switchView(UIManager.getInstance().themes.THANKS));
    }
}