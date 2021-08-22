import { max, sum } from './functions/util.js';
import { summary } from './functions/summary.js'
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
    #selectedExtendTalent = null;
    #hintTimeout;

    async initial() {
        this.initPages();
        this.switch('loading');
        await this.#life.initial();
        this.switch('index');
        window.onerror = (event, source, lineno, colno, error) => {
            this.hint(`[ERROR] at (${source}:${lineno}:${colno})\n\n${error?.stack||error||'unknow Error'}`, 'error');
        }
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
        </div>
        `);

        indexPage
            .find('#restart')
            .click(()=>this.switch('talent'));

        indexPage
            .find('#rank')
            .click(()=>this.hint('别卷了！没有排行榜'));

        // Talent
        const talentPage = $(`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">天赋抽卡</div>
            <button id="random" class="mainbtn" style="top: 50%;">10连抽！</button>
            <ul id="talents" class="selectlist"></ul>
            <button id="next" class="mainbtn" style="top:auto; bottom:0.1em">请选择3个</button>
        </div>
        `);

        const createTalent = ({ grade, name, description }) => {
            return $(`<li class="grade${grade}b">${name}（${description}）</li>`)
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
                                this.#talentSelected.delete(talent);
                            } else {
                                if(this.#talentSelected.size==3) {
                                    this.hint('只能选3个天赋');
                                    return;
                                }

                                const exclusive = this.#life.exclusive(
                                    Array.from(this.#talentSelected).map(({id})=>id),
                                    talent.id
                                );
                                if(exclusive != null) {
                                    for(const { name, id } of this.#talentSelected) {
                                        if(id == exclusive) {
                                            this.hint(`与已选择的天赋【${name}】冲突`);
                                            return;
                                        }
                                    }
                                    return;
                                }
                                li.addClass('selected');
                                this.#talentSelected.add(talent);
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
                this.#totalMax = 20 + this.#life.getTalentAllocationAddition(Array.from(this.#talentSelected).map(({id})=>id));
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
            inputBox.on('input', ()=>{
                const t = total();
                let val = get();
                if(t > this.#totalMax) {
                    val -= t - this.#totalMax;
                }
                val = limit(val);
                if(val != inputBox.val()) {
                    set(val);
                }
                freshTotal();
            });
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

        propertyPage
            .find('#random')
            .click(()=>{
                let t = this.#totalMax;
                const arr = [10, 10, 10, 10];
                while(t>0) {
                    const sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1;
                    while(true) {
                        const select = Math.floor(Math.random() * 4) % 4;
                        if(arr[select] - sub <0) continue;
                        arr[select] -= sub;
                        t -= sub;
                        break;
                    }
                }
                groups.CHR.set(10 - arr[0]);
                groups.INT.set(10 - arr[1]);
                groups.STR.set(10 - arr[2]);
                groups.MNY.set(10 - arr[3]);
            });

        propertyPage
            .find('#start')
            .click(()=>{
                if(total()!=this.#totalMax) {
                    this.hint(`你还有${this.#totalMax-total()}属性点没有分配完`);
                    return;
                }
                this.#life.restart({
                    CHR: groups.CHR.get(),
                    INT: groups.INT.get(),
                    STR: groups.STR.get(),
                    MNY: groups.MNY.get(),
                    SPR: 5,
                    TLT: Array.from(this.#talentSelected).map(({id})=>id),
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

        trajectoryPage
            .find('#lifeTrajectory')
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
                $("#lifeTrajectory").scrollTop($("#lifeTrajectory")[0].scrollHeight);
                if(isEnd) {
                    this.#isEnd = true;
                    trajectoryPage.find('#summary').show();
                }
            });

        trajectoryPage
            .find('#summary')
            .click(()=>{
                this.switch('summary');
            })

        // Summary
        const summaryPage = $(`
        <div id="main">
            <div class="head">人生总结</div>
            <ul id="judge" class="judge" style="bottom: calc(35% + 2.5rem)">
                <li class="grade2"><span>颜值：</span>9级 美若天仙</li>
                <li><span>智力：</span>4级 智力一般</li>
                <li><span>体质：</span>1级 极度虚弱</li>
                <li><span>家境：</span>6级 小康之家</li>
                <li><span>享年：</span>3岁 早夭</li>
                <li><span>快乐：</span>3级 不太幸福的人生</li>
            </ul>
            <div class="head" style="top:auto; bottom:35%">天赋，你可以选一个，下辈子还能抽到</div>
            <ul id="talents" class="selectlist" style="top:calc(65% + 0.5rem); bottom:8rem">
                <li class="grade2b">黑幕（面试一定成功）</li>
            </ul>
            <button id="again" class="mainbtn" style="top:auto; bottom:0.1em"><span class="iconfont">&#xe6a7;</span>再次重开</button>
        </div>
        `);

        summaryPage
            .find('#again')
            .click(()=>{
                this.times ++;
                this.#life.talentExtend(this.#selectedExtendTalent);
                this.#selectedExtendTalent = null;
                this.#talentSelected.clear();
                this.#totalMax = 20;
                this.#isEnd = false;
                this.switch('index');
            });

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
                cnt: indexPage.find('#cnt'),
                clear: ()=>{
                    indexPage.find('.hint').hide();

                    const times = this.times;
                    const btnRank = indexPage.find('#rank');
                    const cnt = indexPage.find('#cnt');
                    if(times > 0) {
                        btnRank.show();
                        cnt.show();
                        cnt.text(`已重开${times}次`);
                        return;
                    }

                    btnRank.hide();
                    cnt.hide();
                },
            },
            talent: {
                page: talentPage,
                clear: ()=>{
                    talentPage.find('ul.selectlist').empty();
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
                    trajectoryPage.find('#lifeTrajectory').empty();
                    trajectoryPage.find('#summary').hide();
                    this.#isEnd = false;
                },
                born: ()=>{
                    trajectoryPage.find('#lifeTrajectory').trigger("click");
                }
            },
            summary: {
                page: summaryPage,
                clear: ()=>{
                    const judge = summaryPage.find('#judge');
                    const talents = summaryPage.find('#talents');
                    judge.empty();
                    talents.empty();
                    this.#talentSelected.forEach(talent=>{
                        const li = createTalent(talent);
                        talents.append(li);
                        li.click(()=>{
                            if(li.hasClass('selected')) {
                                this.#selectedExtendTalent = null;
                                li.removeClass('selected');
                            } else if(this.#selectedExtendTalent != null) {
                                this.hint('只能继承一个天赋');
                                return;
                            } else {
                                this.#selectedExtendTalent = talent.id;
                                li.addClass('selected');
                            }
                        });
                    });

                    const records = this.#life.getRecord();
                    const s = (type, func)=>{
                        const value = func(records.map(({[type]:v})=>v));
                        const { judge, grade } = summary(type, value);
                        return { judge, grade, value };
                    };
                    console.table(records);
                    console.debug(records);

                    judge.append([
                        (()=>{
                            const { judge, grade, value } = s('CHR', max);
                            return `<li class="grade${grade}"><span>颜值：</span>${value} ${judge}</li>`
                        })(),
                        (()=>{
                            const { judge, grade, value } = s('INT', max);
                            return `<li class="grade${grade}"><span>智力：</span>${value} ${judge}</li>`
                        })(),
                        (()=>{
                            const { judge, grade, value } = s('STR', max);
                            return `<li class="grade${grade}"><span>体质：</span>${value} ${judge}</li>`
                        })(),
                        (()=>{
                            const { judge, grade, value } = s('MNY', max);
                            return `<li class="grade${grade}"><span>家境：</span>${value} ${judge}</li>`
                        })(),
                        (()=>{
                            const { judge, grade, value } = s('SPR', max);
                            return `<li class="grade${grade}"><span>快乐：</span>${value} ${judge}</li>`
                        })(),
                        (()=>{
                            const { judge, grade, value } = s('AGE', max);
                            return `<li class="grade${grade}"><span>享年：</span>${value} ${judge}</li>`
                        })(),
                        (()=>{
                            const m = type=>max(records.map(({[type]: value})=>value));
                            const value = Math.floor(sum(m('CHR'), m('INT'), m('STR'), m('MNY'), m('SPR'))*2 + m('AGE')/2);
                            const { judge, grade } = summary('SUM', value);
                            return `<li class="grade${grade}"><span>总评：</span>${value} ${judge}</li>`
                        })(),
                    ].join(''));
                }
            }
        }
    }

    switch(page) {
        const p = this.#pages[page];
        if(!p) return;
        $('#main').detach();
        p.clear();
        p.page.appendTo('body');
    }

    hint(message, type='info') {
        if(this.#hintTimeout) {
            clearTimeout(this.#hintTimeout);
            this.#hintTimeout = null;
        }
        hideBanners();
        requestAnimationFrame(() => {
            const banner = $(`.banner.${type}`);
            banner.addClass('visible');
            banner.find('.banner-message').text(message);
            if(type != 'error') {
                this.#hintTimeout = setTimeout(hideBanners, 3000);
            }
        });
    }

    get times() {return JSON.parse(localStorage.times||'0') || 0;}
    set times(v) {localStorage.times = JSON.stringify(parseInt(v) || 0)};

}

export default App;