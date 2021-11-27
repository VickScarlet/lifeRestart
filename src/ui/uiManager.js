import Views from './themes/views.js';
export default class UIManager {
    constructor(stage) {
        UIManager.#views = Views;

        if(!stage) {
            stage = Laya.stage;
        }
        this.#stage = stage;
        this.theme = 'default';

        stage.addChild(this.#viewLayer);
        this.#viewLayer.zOrder = 1;
        stage.addChild(this.#dialogLayer);
        this.#dialogLayer.zOrder = 2;
        stage.addChild(this.#popupLayer);
        this.#popupLayer.zOrder = 3;
        this.#viewLayer.top =
        this.#viewLayer.bottom =
        this.#viewLayer.left =
        this.#viewLayer.right =
        this.#dialogLayer.top =
        this.#dialogLayer.bottom =
        this.#dialogLayer.left =
        this.#dialogLayer.right =
        this.#popupLayer.top =
        this.#popupLayer.bottom =
        this.#popupLayer.left =
        this.#popupLayer.right = 0;
    }

    static #instance = {};
    static #views;
    #stage;
    #loading;
    #currentView;
    #viewLayer = new Laya.Panel();
    #dialogLayer = new Laya.Panel();
    #popupLayer = new Laya.Panel();
    #viewMap = new Map();
    #class = new Map();
    #theme = 'default';

    static get inst() {
        return this.getInstance();
    }
    static getInstance(name="default") {
        return this.#instance[name] || (this.#instance[name] = new UIManager());
    }

    static get pages() {
        return this.#views.pages;
    }

    static get popups() {
        return this.#views.popups;
    }

    static theme(theme, prop) {
        return this.#views.themes[theme][prop];
    }

    async setLoading(loading) {
        const className = this.#pages[loading];
        const view = await this.getView(className, null, null, loading);
        view.top = view.bottom = view.left = view.right = 0;
        view.zOrder = 4;
        this.#loading = view;
    }

    async switchView(viewName, args, actions) {
        const className = this.#pages[viewName];
        // get view instance
        const view = await this.getView(className, args, actions?.load, viewName, 'pages');

        view.top = view.bottom = view.left = view.right = 0;
        // close current view
        this.clearAllDialog();
        await this.#currentView?.__close?.(view);
        await this.#currentView?.close?.(view);
        this.#viewLayer.removeChildren();

        // open new view
        await view.init?.(args);

        this.#currentView = view;
        this.#viewLayer.addChild(view);

        view.__close = actions?.close;
        await actions?.open?.(view);
        await view.show?.();
    }

    async getView(className, args, preload, viewName, type) {
        // check if view is already loaded
        let view = await this.#viewMap.get(className);

        if(this.#loading) {
            this.#stage.addChild(this.#loading);
        }
        const onProgress = this.#loading?.onProgress;

        if(!view) {
            // load view
            const ViewClass = await this.loadView(className);
            const resourceList = await ViewClass.load?.(args);
            const scanedResourceList = this.#loading? this.scanResource(ViewClass.uiView): [];
            if(preload) {
                preload = [].concat(preload).concat(scanedResourceList);
            } else {
                preload = scanedResourceList;
            }
            await this.loadRes(resourceList, preload, onProgress);

            // create view
            view = new ViewClass();
            // add view to map
            this.#viewMap.set(className, view);
        } else {
            // load resource
            const resourceList = await view.constructor.load?.(args);
            await this.loadRes(resourceList, preload, onProgress);
        }

        this.#loading?.removeSelf();

        this.#config(view, viewName, type);
        // return view
        return view;
    }

    async loadView(className) {
        // load view
        if(this.#class.has(className)) return this.#class.get(className);
        const c = (await import(`./themes/${className}.js`)).default;
        this.#class.set(className, c);
        return c;
    }

    async loadRes(resourceList, preload, onProgress) {
        const cnt = (resourceList?.length || 0)
            +(preload?.length || 0);
        if(resourceList && resourceList.length) {
            const s = resourceList.length / cnt;
            await Laya.promises.loader.load(resourceList, Laya.Handler.create(null, prg=>onProgress?.(prg*s)));
        }
        if(preload && preload.length) {
            const s = 1 - preload.length / cnt;
            const l = preload.length / cnt;
            await Laya.promises.loader.load(preload, Laya.Handler.create(null, prg=>onProgress?.(prg*l+s)));
        }
    }

    async showDialog(dialogName, args, actions) {
        const className = this.#pages[dialogName];
        const dialog = await this.getView(className, args, actions?.load, viewName, 'pages');

        dialog.init(args);
        this.#dialogLayer.addChild(dialog);

        const open = actions?.open || (async () => {
            this.#dialogLayer.scaleX = 0;
            this.#dialogLayer.scaleY = 0;
            await Laya.promises.Tween.to(dialog, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.backOut);
        });
        await open(dialog);
        dialog.close = actions?.close || (async () => {
            await Laya.promises.Tween.to(dialog, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
        });;

        this.#dialogLayer.addChild(dialog);
    }

    async popup(type, args) {
        const className = this.#popups[type];
        const popup = await this.getView(className, args, null, type, 'popups');
        this.#popupLayer.addChild(popup);
        await popup.popup(args, this.#popupLayer);
        this.#popupLayer.removeChild(popup);
    }

    clearAllDialog() {
        this.#dialogLayer.removeChildren();
    }

    #config(view, key, type) {
        const config = this.#configs?.[type]?.[key];
        if(!config) return;
        if(view.config && view.config(config)) return;
        const applyConfig = (target, config) => {
            if(!target) return;
            if(typeof config == 'string') {
                config = this.#configs?.class?.[config];
            }
            $_.deepMapSet(target, config);
        };

        if(config.names)
            for(const name in config.names)
                this.#deepGetChildsByName(view, name)
                    .forEach(child => applyConfig(child, config.names[name]));

        if(config.vars)
            for(const key in config.vars)
                applyConfig(view[key], config.vars[key]);

    }

    #deepGetChildsByName(parent, name) {
        const list = [];
        if(!parent || !parent._childs) return list;

        for(const child of parent._childs) {
            if(child.name == name) list.push(child);
            if(child._childs) list.push(...this.#deepGetChildsByName(child, name));
        }
        return list;
    }

    #cutPath(path) {
        path = ''+path;
        let index = path.length;
        do {
            index --;
            if(path[index] == '.') {
                break;
            }
        } while (index>0)
        return [
            path.substring(0, index),
            path.substring(index, path.length)
        ];
    }

    #subSkin(skin, type) {
        if(!skin || !skin.replace(/\s/g, '')) return [];
        switch (type) {
            case 'ProgressBar':
                return [ skin, ...this.#progressBarSkin(skin) ];
            case 'ScrollBar':
                return [ skin, ...this.#scrollBarSkin(skin) ];
            default:
                return [skin]
        }
    }

    #progressBarSkin(skin) {
        if(!skin.replace(/\s/g, '')) return [];
        let p = this.#cutPath(skin);
        return [`${p[0]}$bar${p[1]}`];
    }

    #scrollBarSkin(skin) {
        if(!skin.replace(/\s/g, '')) return [];
        let p = this.#cutPath(skin);
        return [
            `${p[0]}$bar${p[1]}`,
            `${p[0]}$up${p[1]}`,
            `${p[0]}$down${p[1]}`
        ];
    }

    scanResource(uiView) {
        if(!uiView) return [];
        const resourceList = [];

        resourceList.push(...this.#subSkin(uiView.props?.skin, uiView.type));
        resourceList.push(...this.#subSkin(uiView.props?.hScrollBarSkin, 'ScrollBar'));
        resourceList.push(...this.#subSkin(uiView.props?.vScrollBarSkin, 'ScrollBar'));

        uiView.child?.forEach(child => {
            resourceList.push(...this.scanResource(child));
        });

        return resourceList;
    }

    get currentView() {
        return this.#currentView;
    }

    get theme() {
        return this.#theme;
    }
    set theme(value) {
        this.#theme = value;
        this.#stage.bgColor = this.#configs.bgColor;
        document?.querySelector?.('meta[name="theme-color"]')?.setAttribute?.('content', this.#configs.bgColor);
    }

    get #pages() {
        return UIManager.theme(this.#theme, 'pages');
    }
    get #popups() {
        return UIManager.theme(this.#theme, 'popups');
    }
    get #configs() {
        return UIManager.theme(this.#theme, 'configs');
    }
    get common() {
        return this.#configs.common;
    }
    gradeColor(grade) {
        return this.common.grade[grade];
    }
    gradeFilter(grade) {
        return this.common.filter[grade];
    }
}