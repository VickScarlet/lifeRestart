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
        // Laya.init(1125, 2436, Laya.WebGL);
        Laya.init(...this.#fitScreen, Laya.WebGL);

        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#04131f";
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
        Laya.Text.langPacks = (await import(`./i18n/${this.#language}.js`)).default;
    }

    resigterEvent() {
        $$on('achievement', achievement => {
            UIManager.getInstance().popup(UIManager.getInstance().themes.popup.ACHIEVEMENT, {achievement});
        })
    }

    async start({
        language = App.languages['zh-cn']
    }) {
        this.resigterEvent();
        this.#initLaya();
        const uiManager = UIManager.getInstance();
        uiManager.themes = ViewTypes.themes.default;
        await this.#setLanguage(language);
        await uiManager.setLoading(uiManager.themes.LOADING);
        await uiManager.switchView(uiManager.themes.LOADING);
        await core.initial(dataSet=>Laya.promises.loader.load(`data/${this.#language}/${dataSet}.json`, null, Laya.Loader.JSON));
        await uiManager.switchView(uiManager.themes.MAIN, null, {
            load: [
                "fonts/方正像素12.ttf",
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
