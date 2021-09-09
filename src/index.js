import App from '../src/app.js';

globalThis.$$eventMap = new Map();
globalThis.$$event = (tag, data) => {
    const listener = $$eventMap.get(tag);
    if(listener) listener.forEach(fn=>fn(data));
}
globalThis.$$on = (tag, fn) => {
    let listener = $$eventMap.get(tag);
    if(!listener) {
        listener = new Set();
        $$eventMap.set(tag, listener);
    }
    listener.add(fn);
}
globalThis.$$off = (tag, fn) => {
    const listener = $$eventMap.get(tag);
    if(listener) listener.delete(fn);
}

globalThis.json = async fileName => await (await fetch(`../data/${fileName}.json`)).json();

// Pssst, I've created a github package - https://github.com/brookesb91/dismissible
globalThis.hideBanners = (e) => {
    document
        .querySelectorAll(".banner.visible")
        .forEach((b) => b.classList.remove("visible"));
};

const app = new App();
app.initial();