export default class Thanks extends ThanksUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.MAIN));
    }
}