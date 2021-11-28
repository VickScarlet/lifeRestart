export default class Loading extends ui.view.LoadingUI {
    constructor() {
        super();
    }

    static load() {
        return [
            "images/atlas/images/resource.atlas"
        ]
    }

    show() {}

    onProgress(progress) {}
}