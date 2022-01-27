export default class CyberMode extends ui.view.CyberTheme.ModeUI {
    constructor() {
        super();
        this.btnCustom.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.TALENT));
        this.btnCelebrity.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.CELEBRITY));
    }
}