export default class Main extends MainUI {
    constructor() {
        super();
        this.btnRemake.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.TALENT));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.ACHIEVEMENT));
        this.btnThanks.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.THANKS));
        this.btnGithub.on(Laya.Event.CLICK, this, goto, ['github']);
        this.btnDiscord.on(Laya.Event.CLICK, this, goto, ['discord']);
    }

    static load() {
        return [
            "images/atlas/images/icons.atlas",
        ]
    }

    init() {
        this.btnDiscord.visible =
        this.btnAchievement.visible =
        this.btnThanks.visible = !!core.times;
    }
}