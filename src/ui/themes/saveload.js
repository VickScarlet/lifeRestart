export default class SaveLoad extends ui.view.SaveLoadUI {
    constructor() {
        super();
        this.btnClose.on(Laya.Event.CLICK, this, async ()=>{
            await this.close();
            $ui.switchView(UI.pages.MAIN);
        });
        this.btnRead.on(Laya.Event.CLICK, this, async ()=>{
            const result = await $$copy(this.input.text = this.data);
            $$event('message', [result? 'UI_CopySuccess': 'UI_CopyFaild']);
        });
        this.btnWrite.on(Laya.Event.CLICK, this, async ()=>{
            const text = await $$read();
            if(text == false) {
                this.data = [
                    this.input.text,
                    'UI_PasteFaildDecodeSuccess',
                    'UI_PasteFaildDecodeFaild'
                ];
            } else {
                this.input.text = text;
                this.data = [
                    text,
                    'UI_PasteSuccessDecodeSuccess',
                    'UI_PasteSuccessDecodeFaild'
                ];
            }
        });

        this.btnSave.on(Laya.Event.CLICK, this, ()=>{
            let blob = new Blob([this.data], { type: 'application/json' });
            const slice = blob.slice || blob.webkitSlice || blob.mozSlice;
            blob = slice.call(blob, 0, blob.size, 'application/octet-stream');
            const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            a.href = URL.createObjectURL(blob);
            a.download = `Remake_save_${new Date().toISOString().replace(':','.')}.json`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        });
        this.btnLoad.on(Laya.Event.CLICK, this, ()=>{
            const file = document.createElement('input');
            file.setAttribute('type', 'file');
            file.setAttribute('name', 'file');
            file.setAttribute('accept', 'application/json');
            file.setAttribute('style', 'display: none;');
            document.body.appendChild(file);
            file.click();
            file.onchange = (e)=>{
                const file = e.target.files[0];
                if(!file) return;
                const reader = new FileReader();
                reader.onload = () => this.data = [reader.result];
                reader.readAsText(file);
                document.body.removeChild(file);
            };
        });
        this.input.on(Laya.Event.MOUSE_DOWN, this, ()=>{
            this.input.setSelection(0, this.input.text.length);
        })
    }

    static load() {
        return ["images/atlas/images/radio.atlas"];
    }

    init() {
        this.input.text = this.data;
    }

    get data() {
        const data = {};
        Object
            .keys(localStorage)
            .filter(v=>v.substr(0,4)!='goog')
            .forEach(key=>data[key] = localStorage[key]);
        return JSON.stringify(data);
    }

    set data([v, success = 'UI_LoadSuccess', faild = 'UI_LoadFaild']) {
        try {
            const data = JSON.parse(v);
            for(const key in data)
                localStorage.setItem(key, data[key]);
            $$event('message', [success]);
            $ui.theme = $ui.theme;
            this.btnClose.event(Laya.Event.CLICK);
        } catch (e) {
            console.error(e);
            $$event('message', [faild]);
        }
    }
}