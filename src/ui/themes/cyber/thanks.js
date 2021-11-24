export default class CyberThanks extends CyberThanksUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.MAIN));
    }
}