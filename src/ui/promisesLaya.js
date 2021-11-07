Laya.promises = {
    Tween: {
        from: async function (target, props, duration, ease, delay, coverBefore) {
            return new Promise(function (resolve, reject) {
                try {
                    Laya.Tween.from(target, props, duration, ease, Laya.Handler.create(null, ()=>resolve(), null, true), delay, coverBefore);
                } catch (e) {
                    reject(e);
                }
            });
        },
        to: async function (target, props, duration, ease, delay, coverBefore) {
            return new Promise(function (resolve, reject) {
                try {
                    Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(null, ()=>resolve(), null, true), delay, coverBefore);
                } catch (e) {
                    reject(e);
                }
            });
        },
    },
    loader: {
        load: async function (url, progress, type) {
            return new Promise(function (resolve, reject) {
                try {
                    Laya.loader.load(url, Laya.Handler.create(null, ret=>resolve(ret), null, true), progress, type);
                } catch (e) {
                    reject(e);
                }
            });
        }

    }
};