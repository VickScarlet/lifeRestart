import UIManager from './ui/uiManager.js';
import * as utils from './functions/util.js';

globalThis.UIManager =
globalThis.UI =
UIManager;

globalThis.$_ = utils;
class App{
    constructor(){
        this.name = 'lifeRestart';
        this.version = '2.0.0';
        console.log(`${this.name} ${this.version}`);
    }

    #language;
    static languages = {
        'zh-cn': 'zh-cn',
        'en-us': 'en-us',
    };

    #initLaya() {
        // Laya.init(1125, 2436, Laya.WebGL);
        Laya.Config.isAntialias = true;
        Laya.init(...this.#fitScreen, Laya.WebGL);

        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#000000";
        window.onresize = () => Laya.stage.size(...this.#fitScreen);
    }

    get #fitScreen() {
        const designWidth = 1125;
        const designHeight = 2436;
        const maxWidth = designHeight * 3 / 4;
        const maxHeight = designWidth * 24 / 9;
        const designRatio = designWidth / designHeight;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const screenRatio = screenWidth / screenHeight;
        if(screenRatio > designRatio) {
            return [
                Math.min(screenWidth*designHeight/screenHeight, maxWidth),
                designHeight
            ]
        } else {
            return [
                designWidth,
                Math.min(screenHeight*designWidth/screenWidth, maxHeight)
            ]
        }
    }

    async setLanguage(language) {
        return this.#setLanguage(language);
    }

    async #setLanguage(language) {
        switch(language) {
            case App.languages['en-us']:
            case App.languages['zh-cn']:
                this.#language = language;
                break;
            default:
                this.#language = App.languages['zh-cn'];
                break;
        }
        globalThis.$lang =
        Laya.Text.langPacks =
            (await import(`./i18n/${this.#language}.js`)).default;
    }

    resigterEvent() {
        $$on('achievement', achievement => {
            $ui.popup(UI.popups.ACHIEVEMENT, {achievement});
        })
    }

    async start({
        language = App.languages['zh-cn'],
        theme = 'default',
    }) {
        this.resigterEvent();
        this.#initLaya();
        globalThis.$ui = UIManager.getInstance();
        $ui.theme = theme;
        await this.#setLanguage(language);
        await $ui.setLoading(UI.pages.LOADING);
        await $ui.switchView(UI.pages.LOADING);
        await core.initial(dataSet=>Laya.promises.loader.load(`data/${this.#language}/${dataSet}.json`, null, Laya.Loader.JSON));
        await $ui.switchView(UI.pages.MAIN);
    }
}

export default App;
