import App from '../src/app.js';


window.json = async fileName => await (await fetch(`../data/${fileName}.json`)).json();

// Pssst, I've created a github package - https://github.com/brookesb91/dismissible
window.hideBanners = (e) => {
    document
        .querySelectorAll(".banner.visible")
        .forEach((b) => b.classList.remove("visible"));
};

const app = new App();
app.initial();