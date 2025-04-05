class c extends ui.view.SaveLoadUI{constructor(){super(),this.btnClose.on(Laya.Event.CLICK,this,async()=>{await this.close(),$ui.switchView(UI.pages.MAIN)}),this.btnRead.on(Laya.Event.CLICK,this,async()=>{const t=await $$copy(this.input.text=this.data);$$event("message",[t?"UI_CopySuccess":"UI_CopyFailed"])}),this.btnWrite.on(Laya.Event.CLICK,this,async()=>{const t=await $$read();t==!1?this.data=[this.input.text,"UI_PasteFailedDecodeSuccess","UI_PasteFailedDecodeFailed"]:(this.input.text=t,this.data=[t,"UI_PasteSuccessDecodeSuccess","UI_PasteSuccessDecodeFailed"])}),this.btnSave.on(Laya.Event.CLICK,this,()=>{let t=new Blob([this.data],{type:"application/json"});t=(t.slice||t.webkitSlice||t.mozSlice).call(t,0,t.size,"application/octet-stream");const e=document.createElementNS("http://www.w3.org/1999/xhtml","a");e.href=URL.createObjectURL(t),e.download=`Remake_save_${new Date().toISOString().replace(":",".")}.json`,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(e.href)}),this.btnLoad.on(Laya.Event.CLICK,this,()=>{const t=document.createElement("input");t.setAttribute("type","file"),t.setAttribute("name","file"),t.setAttribute("accept","application/json"),t.setAttribute("style","display: none;"),document.body.appendChild(t),t.click(),t.onchange=a=>{const e=a.target.files[0];if(!e)return;const i=new FileReader;i.onload=()=>this.data=[i.result],i.readAsText(e),document.body.removeChild(e)}}),this.input.on(Laya.Event.MOUSE_DOWN,this,()=>{this.input.setSelection(0,this.input.text.length)}),this.btnBackup.on(Laya.Event.CLICK,this,()=>{const t=document.createElement("div");document.body.appendChild(t),t.style=`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0.95`;const a=document.createElement("div");a.style=`
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #fff;
                opacity: 0.95`,document.body.appendChild(t),t.appendChild(a);const e=document.createElement("textarea");e.style=`position: absolute; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,e.value=JSON.stringify(JSON.parse(this.data),null,4),t.appendChild(e);const i=document.createElement("div");i.style=`
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
                opacity: 0.7`,i.innerHTML="×",t.appendChild(i),i.onclick=()=>t.remove();const o=document.createElement("div");o.style=`
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
                opacity: 0.7`,o.innerHTML="LOAD<br>读取",t.appendChild(o),o.onclick=()=>this.data=[e.value,"成功/success","失败/failed",!0]})}static load(){return["images/atlas/images/radio.atlas"]}init(){this.input.text=this.data}get data(){const t={};return Object.keys(localStorage).filter(a=>a.substr(0,4)!="goog").forEach(a=>t[a]=localStorage[a]),JSON.stringify(t)}set data([t,a="UI_LoadSuccess",e="UI_LoadFailed",i]){try{const o=JSON.parse(t);for(const n in o)localStorage.setItem(n,o[n]);i?alert(a):$$event("message",[a]),$ui.theme=$ui.theme,this.btnClose.event(Laya.Event.CLICK)}catch(o){console.error(o),i?alert(`${e}
${o}`):$$event("message",[e])}}}export{c as default};
