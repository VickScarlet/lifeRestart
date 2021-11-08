import ViewTypes from './ui/themes/views.js';

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
        Laya.init(1125, 2436, Laya.WebGL);

        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#04131f";
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
        Laya.Text.langPacks = (await import(`./i18n/${this.#language}.js`)).default;
    }

    async start({
        language = App.languages['zh-cn']
    }) {
        this.#initLaya();
        const uiManager = UIManager.getInstance();
        uiManager.themes = ViewTypes.themes.default;
        await this.#setLanguage(language);
        await uiManager.setLoading(uiManager.themes.LOADING);
        await uiManager.switchView(uiManager.themes.LOADING);
        await core.initial(dataSet=>Laya.promises.loader.load(`data/${this.#language}/${dataSet}.json`, null, Laya.Loader.JSON));
        await uiManager.switchView(uiManager.themes.MAIN, null, {
            load: [
                "images/atlas/images/accessories.atlas",
                "images/atlas/images/border.atlas",
                "images/atlas/images/button.atlas",
                "images/atlas/images/icons.atlas",
                "images/atlas/images/progress.atlas",
                "images/atlas/images/slider.atlas",
            ]
        });
    }
}

export default App;
