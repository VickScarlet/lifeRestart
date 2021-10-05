import App from './app.js';
import { readFile, writeFile } from 'fs/promises';

async function main() {

    try {
        globalThis.localStorage = JSON.parse(await readFile('__localStorage.json'));
    } catch (e) {
        globalThis.localStorage = {};
    }
    localStorage.getItem = key => localStorage[key]===void 0? null: localStorage[key];
    localStorage.setItem = (key, value) => (localStorage[key] = value);

    globalThis.dumpLocalStorage = async ()=>await writeFile('__localStorage.json', JSON.stringify( global.localStorage))

    const app = new App();
    app.io(
        repl => process.stdin.on('data', data=>repl(data.toString().trim())),
        (data, isRepl) => process.stdout.write(`${data}${isRepl?'\n>':''}`),
        code=>process.exit(code)
    )
    await app.initial();
}

main();

// process.stdin.setRawMode(true);

// process.openStdin().on('keypress', function (chunk, key) {
//   process.stdout.write('Get Chunk: ' + chunk + '\n');
//   if (key && key.ctrl && key.name == 'c') process.exit();
// });