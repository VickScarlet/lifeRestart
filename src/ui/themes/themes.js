export default class Themes extends ui.view.ThemesUI {
    constructor() {
        super();
        this.btnClose.on(Laya.Event.CLICK, this, ()=>this.close());
        this.btnOK.on(Laya.Event.CLICK, this, async ()=>{
            const selected = this.selected;
            if(!selected == $ui.theme) return this.close();
            $ui.theme = selected;
            await this.close();
            $ui.switchView(UI.pages.MAIN);
        });
    }

    static load() {
        return ["images/atlas/images/radio.atlas"];
    }

    init() {
        this.selected = localStorage.getItem('theme');
    }

    get selected() {
        switch(this.radioTheme.selectedIndex) {
            case 0: return 'cyber';
            case 1: return 'dark';
            case 2: return 'light';
            default: return 'default';
        }
    }
    set selected(v) {
        let index;
        switch(v) {
            case 'cyber': index = 0; break;
            case 'dark': index = 1; break;
            case 'light': index = 2; break;
            default: index = -1; break;
        }
        this.radioTheme.selectedIndex = index;
    }
}