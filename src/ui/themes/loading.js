export default class Loading extends LoadingUI {
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