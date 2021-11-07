import App from './app.js';
import Life from './modules/life.js';

const core = new Life();
const game = new App();
globalThis.core = core;
globalThis.game = game;

const query = {};
location.search.substr(1).split('&').forEach(item => {
    const parts = item.split('=');
    query[parts[0]] = parts[1];
});

game.start(query.lang);
