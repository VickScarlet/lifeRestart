var e=class extends ui.view.SaveLoadUI{constructor(){super(),this.btnClose.on(Laya.Event.CLICK,this,async()=>{await this.close(),$ui.switchView(UI.pages.MAIN)}),this.btnRead.on(Laya.Event.CLICK,this,async()=>{let e=await $$copy(this.input.text=this.data);$$event(`message`,[e?`UI_CopySuccess`:`UI_CopyFailed`])}),this.btnWrite.on(Laya.Event.CLICK,this,async()=>{let e=await $$read();e==0?this.data=[this.input.text,`UI_PasteFailedDecodeSuccess`,`UI_PasteFailedDecodeFailed`]:(this.input.text=e,this.data=[e,`UI_PasteSuccessDecodeSuccess`,`UI_PasteSuccessDecodeFailed`])}),this.btnSave.on(Laya.Event.CLICK,this,()=>{let e=new Blob([this.data],{type:`application/json`});e=(e.slice||e.webkitSlice||e.mozSlice).call(e,0,e.size,`application/octet-stream`);let t=document.createElementNS(`http://www.w3.org/1999/xhtml`,`a`);t.href=URL.createObjectURL(e),t.download=`Remake_save_${new Date().toISOString().replace(`:`,`.`)}.json`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(t.href)}),this.btnLoad.on(Laya.Event.CLICK,this,()=>{let e=document.createElement(`input`);e.setAttribute(`type`,`file`),e.setAttribute(`name`,`file`),e.setAttribute(`accept`,`application/json`),e.setAttribute(`style`,`display: none;`),document.body.appendChild(e),e.click(),e.onchange=e=>{let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=()=>this.data=[n.result],n.readAsText(t),document.body.removeChild(t)}}),this.input.on(Laya.Event.MOUSE_DOWN,this,()=>{this.input.setSelection(0,this.input.text.length)}),this.btnBackup.on(Laya.Event.CLICK,this,()=>{let e=document.createElement(`div`);document.body.appendChild(e),e.style=`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0.95`;let t=document.createElement(`div`);t.style=`
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #fff;
                opacity: 0.95`,document.body.appendChild(e),e.appendChild(t);let n=document.createElement(`textarea`);n.style=`position: absolute; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,n.value=JSON.stringify(JSON.parse(this.data),null,4),e.appendChild(n);let r=document.createElement(`div`);r.style=`
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
                background: red;
                font-size:100px;
                padding: 0;
                line-height: 100px;
                color: white;
                opacity: 0.7`,r.innerHTML=`×`,e.appendChild(r),r.onclick=()=>e.remove();let i=document.createElement(`div`);i.style=`
                position: absolute;
                bottom: 0;
                right: 0;
                width: 100px;
                height: 100px;
                background: limegreen;
                font-size: 35px;
                padding: 0;
                line-height: 50px;
                color: white;
                opacity: 0.7`,i.innerHTML=`LOAD<br>读取`,e.appendChild(i),i.onclick=()=>this.data=[n.value,`成功/success`,`失败/failed`,!0]})}static load(){return[`images/atlas/images/radio.atlas`]}init(){this.input.text=this.data}get data(){let e={};return Object.keys(localStorage).filter(e=>e.substr(0,4)!=`goog`).forEach(t=>e[t]=localStorage[t]),JSON.stringify(e)}set data([e,t=`UI_LoadSuccess`,n=`UI_LoadFailed`,r]){try{let n=JSON.parse(e);for(let e in n)localStorage.setItem(e,n[e]);r?alert(t):$$event(`message`,[t]),$ui.theme=$ui.theme,this.btnClose.event(Laya.Event.CLICK)}catch(e){console.error(e),r?alert(`${n}\n${e}`):$$event(`message`,[n])}}};export{e as default};