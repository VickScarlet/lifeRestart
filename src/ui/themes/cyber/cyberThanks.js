export default class cyberThanks extends CyberThanksUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, ()=>UIManager.getInstance().switchView(UIManager.getInstance().themes.MAIN));
    }
}