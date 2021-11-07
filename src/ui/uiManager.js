class UIManager {
    constructor(stage) {
        if(!stage) {
            stage = Laya.stage;
        }

        this.#stage = stage;

        stage.addChild(this.#viewLayer);
        this.#viewLayer.zOrder = 1;
        stage.addChild(this.#dialogLayer);
        this.#dialogLayer.zOrder = 2;
        this.#viewLayer.top =
        this.#viewLayer.bottom =
        this.#viewLayer.left =
        this.#viewLayer.right =
        this.#dialogLayer.top =
        this.#dialogLayer.bottom =
        this.#dialogLayer.left =
        this.#dialogLayer.right = 0;
    }

    static #instance = {};
    #stage;
    #loading;
    #currentView;
    #viewLayer = new Laya.Panel();
    #dialogLayer = new Laya.Panel();
    #viewMap = new Map();
    theme;

    static getInstance(name="default") {
        return this.#instance[name] || (this.#instance[name] = new UIManager());
    }

    async setLoading(loading) {
        const view = await this.getView(loading);
        this.#loading = view;
        this.#loading.zOrder = 3;
    }

    async switchView(viewName, args, actions) {
        // get view instance
        const view = await this.getView(viewName, args, actions?.load);

        // close current view
        this.clearAllDialog();
        await this.#currentView?.close?.(view);
        this.#viewLayer.removeChildren();

        // open new view
        await view.init?.(args);

        this.#currentView = view;
        this.#viewLayer.addChild(view);

        view.close = actions?.close;
        await actions?.open?.(view);
        await view.show?.();
    }

    async getView(viewName, args, preload) {
        // check if view is already loaded
        let view = await this.#viewMap.get(viewName);

        if(this.#loading) {
            this.#stage.addChild(this.#loading);
        }
        const onProgress = this.#loading?.onProgress;

        if(!view) {
            // load view
            const ViewClass = await this.loadView(viewName);
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
            this.#viewMap.set(viewName, view);
        } else {
            // load resource
            const resourceList = await view.constructor.load?.(args);
            await this.loadRes(resourceList, preload, onProgress);
        }

        this.#loading?.removeSelf();

        // return view
        return view;
    }

    async loadView(viewName) {
        // load view
        return (await import(`../view/${viewName}.js`)).default;
    }

    async loadRes(resourceList, preload, onProgress) {
        let list = [];
        if(resourceList) list = list.concat(resourceList);
        if(preload) list = list.concat(preload);

        if(list.length) {
            await Laya.promises.loader.load(list, Laya.Handler.create(null, onProgress));
        }
    }

    async showDialog(dialogName, args, actions) {
        const dialog = await this.getView(dialogName, args, actions?.load);

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

    clearAllDialog() {
        this.#dialogLayer.removeChildren();
    }

    scanResource(uiView) {
        if(!uiView) return [];
        const resourceList = [];
        if(uiView.props?.skin) {
            resourceList.push(uiView.props.skin);
        }
        uiView.child?.forEach(child => {
            resourceList.push(...this.scanResource(child));
        });

        return resourceList;
    }
}