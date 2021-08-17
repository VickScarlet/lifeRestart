import Life from './life.js'
class App{
    constructor(){
        this.#life = new Life();
    }

    #life;
    #pages;
    #talentSelected = new Set();
    #totalMax=20;
    #isEnd = false;

    async initial() {
        this.initPages();
        this.switch('loading');
        await this.#life.initial();
        this.switch('index');
    }

    initPages() {

        // Loading
        const loadingPage = $(`
        <div id="main">
            <div id="title">
                人生重开模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">加载中...</div>
            </div>
        </div>
        `);

        // Index
        const indexPage = $(`
        <div id="main">
            <div id="cnt" class="head">已重开1次</div>
            <button id="rank">排行榜</button>
            <div id="title">
                人生重开模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">这垃圾人生一秒也不想呆了</div>
            </div>
            <button id="restart" class="mainbtn"><span class="iconfont">&#xe6a7;</span>立即重开</button>
            <div class="hint">别卷了！没有排行榜</div>
        </div>
        `);

        indexPage
            .find('#restart')
            .click(()=>this.switch('talent'));

        const talentPage = $(`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">天赋抽卡</div>
            <button id="random" class="mainbtn" style="top: 50%;">10连抽！</button>
            <ul id="talents" class="selectlist"></ul>
            <button id="next" class="mainbtn" style="top:auto; bottom:0.1em">请选择3个</button>
        </div>
        `);

        // Talent
        const createTalent = ({ grade, name, description }) => {
            const element = $(`<li>${name}（${description}）</li>`)
            switch(grade) {
                case 1:
                    element.addClass('sprcial_blue');
                    break;
                case 2:
                    element.addClass('sprcial_purple');
                    break;
                case 3:
                    element.addClass('sprcial_orange');
                    break;
                default: break;
            }
            return element;
        };

        talentPage
            .find('#random')
            .click(()=>{
                talentPage.find('#random').hide();
                const ul = talentPage.find('#talents');
                this.#life.talentRandom()
                    .forEach(talent=>{
                        const li = createTalent(talent);
                        ul.append(li);
                        li.click(()=>{
                            if(li.hasClass('selected')) {
                                li.removeClass('selected')
                                this.#talentSelected.delete(talent.id);
                            } else {
                                if(this.#talentSelected.size==3) {
                                    this.hint('只能选3个天赋');
                                    return;
                                }
                                li.addClass('selected');
                                this.#talentSelected.add(talent.id);
                            }
                        });
                    });
            });

        talentPage
            .find('#next')
            .click(()=>{
                if(this.#talentSelected.size!=3) {
                    this.hint('请选择3个天赋');
                    return;
                }
                this.#totalMax = 20 + this.#life.getTalentAllocationAddition(Array.from(this.#talentSelected));
                this.switch('property');
            })

        // Property
        const propertyPage = $(`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">
                调整初始属性<br>
                <div id="total" style="font-size:1rem; font-weight:normal;">可用属性点：0</div>
            </div>
            <ul id="propertyAllocation" class="propinitial"></ul>
            <button id="random" class="mainbtn" style="top:auto; bottom:7rem">随机分配</button>
            <button id="start" class="mainbtn" style="top:auto; bottom:0.1rem">开始新人生</button>
        </div>
        `);

        const groups = {};
        const total = ()=>{
            let t = 0;
            for(const type in groups)
                t += groups[type].get();
            return t;
        }
        const freshTotal = ()=>{
            propertyPage.find('#total').text(`可用属性点：${this.#totalMax - total()}`);
        }
        const getBtnGroups = (name, min, max)=>{
            const group = $(`<li>${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>`);
            const btnSub = $(`<span class="iconfont propbtn">&#xe6a5;</span>`);
            const inputBox = $(`<input value="0">`);
            const btnAdd = $(`<span class="iconfont propbtn">&#xe6a6;</span>`);
            group.append(btnSub);
            group.append(inputBox);
            group.append(btnAdd);

            const limit = v=>{
                v = Number(v)||0;
                v = Math.round(v);
                return v < min ? min : (
                    v > max ? max : v
                )
            }
            const get = ()=>Number(inputBox.val());
            const set = v=>{
                inputBox.val(limit(v));
                freshTotal();
            }
            btnAdd.click(()=>{
                if(total() == this.#totalMax) {
                    this.hint('没用可分配的点数了');
                    return;
                }
                set(get()+1);
            });
            btnSub.click(()=>set(get()-1));
            return {group, get, set};
        }

        groups.CHR = getBtnGroups("颜值", 0, 10); // 颜值 charm CHR
        groups.INT = getBtnGroups("智力", 0, 10); // 智力 intelligence INT
        groups.STR = getBtnGroups("体质", 0, 10); // 体质 strength STR
        groups.MNY = getBtnGroups("家境", 0, 10); // 家境 money MNY

        const ul = propertyPage.find('#propertyAllocation');

        for(const type in groups) {
            ul.append(groups[type].group);
        }

        propertyPage.find('#random')
            .click(()=>{
                let t = this.#totalMax;
                const arr = [10, 10, 10, 10];
                while(t>0) {
                    const sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1;
                    while(true) {
                        const select = Math.floor(Math.random() * 4) % 4;
                        if(arr[select] - sub <0) continue;
                        arr[select] -= sub;
                        break;
                    }
                    t -= sub;
                }
                groups.CHR.set(arr[0]);
                groups.INT.set(arr[1]);
                groups.STR.set(arr[2]);
                groups.MNY.set(arr[3]);
            });

        propertyPage.find('#start')
            .click(()=>{
                this.#life.restart({
                    CHR: groups.CHR.get(),
                    INT: groups.INT.get(),
                    STR: groups.STR.get(),
                    MNY: groups.MNY.get(),
                    SPR: 5,
                    TLT: Array.from(this.#talentSelected),
                });
                this.switch('trajectory');
                this.#pages.trajectory.born();
            });

        // Trajectory
        const trajectoryPage = $(`
        <div id="main">
            <ul id="lifeTrajectory" class="lifeTrajectory"></ul>
            <button id="summary" class="mainbtn" style="top:auto; bottom:0.1rem">人生总结</button>
        </div>
        `);

        trajectoryPage.find('#lifeTrajectory')
            .click(()=>{
                if(this.#isEnd) return;
                const trajectory = this.#life.next();
                const { age, content, isEnd } = trajectory;

                const li = $(`<li><span>${age}岁：</span>${
                    content.map(
                        ({type, description, grade, name, postEvent}) => {
                            switch(type) {
                                case 'TLT':
                                    return `天赋【${name}】发动：${description}`;
                                case 'EVT':
                                    return description + (postEvent?`<br>${postEvent}`:'');
                            }
                        }
                    ).join('<br>')
                }</li>`);
                li.appendTo('#lifeTrajectory');
                if(isEnd) {
                    this.#isEnd = true;
                    trajectoryPage.find('#summary').show();
                }
            });

        trajectoryPage.find('#summary')
            .click(()=>{

            })

        this.#pages = {
            loading: {
                page: loadingPage,
                clear: ()=>{},
            },
            index: {
                page: indexPage,
                btnRank: indexPage.find('#rank'),
                btnRestart: indexPage.find('#restart'),
                hint: indexPage.find('.hint'),
                cnt: indexPage.find('.cnt'),
                clear: ()=>{
                    indexPage.find('.hint').hide();

                    const times = this.times;
                    const btnRank = indexPage.find('#rank');
                    const cnt = indexPage.find('.cnt');
                    if(times < 0) {
                        btnRank.hide();
                        cnt.hide();
                        return;
                    }

                    btnRank.show();
                    cnt.show();
                    cnt.text(`已重开${times}次`);
                },
            },
            talent: {
                page: talentPage,
                clear: ()=>{
                    talentPage.find('ul.selectlist').children().remove();
                    talentPage.find('#random').show();
                    this.#totalMax = 20;
                },
            },
            property: {
                page: propertyPage,
                clear: ()=>{
                    freshTotal();
                },
            },
            trajectory: {
                page: trajectoryPage,
                clear: ()=>{
                    trajectoryPage.find('#lifeTrajectory').children().remove();
                    trajectoryPage.find('#summary').hide();
                    this.#isEnd = false;
                },
                born: ()=>{
                    trajectoryPage.find('#lifeTrajectory').trigger("click");
                }
            },
        }
    }

    switch(page) {
        const p = this.#pages[page];
        if(!p) return;
        $('#main').remove();
        p.clear();
        p.page.appendTo('body');
    }

    hint(str) {
        alert(str);
    }

    get times() {return localStorage.times || 0;}
    set times(v) {localStorage.times = parseInt(v) || 0};

}

export default App;