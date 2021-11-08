import App from './app.js';
import Life from './modules/life.js';

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

const core = new Life();
const game = new App();
globalThis.core = core;
globalThis.game = game;

const query = {};
location.search.substr(1).split('&').forEach(item => {
    const parts = item.split('=');
    query[parts[0]] = parts[1];
});

core.config({
    defaultPropertyPoints: 20, // default number of points for a property
    talentSelectLimit: 3, // max number of talents that can be selected
    propertyAllocateLimit: [0, 10], // scoop of properties that can be allocated
    talentConfig: { // config for talent
        talentPullCount: 10, // number of talents to pull from the talent pool
        talentRate: { 1:100, 2:10, 3:1, total: 1000 }, // rate of talent pull
    },
    defaultPropertys: {
        SPR: 5,
    }
})
game.start(query);
