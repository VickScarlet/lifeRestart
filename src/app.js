import { summary } from './functions/summary.js';
import { getRate, getGrade } from './functions/addition.js';
import Life from './life.js';

class App{
    constructor(){
        this.#life = new Life();
    }

    #life;
    #pages;
    #currentPage;
    #talentSelected = new Set();
    #totalMax=20;
    #isEnd = false;
    #selectedExtendTalent = null;
    #hintTimeout;
    #specialthanks;
    #autoTrajectory;

    async initial() {
        this.initPages();
        this.switch('loading');
        const [,specialthanks] = await Promise.all([
            this.#life.initial(),
            json('specialthanks')
        ]);
        this.#specialthanks = specialthanks;
        this.switch('index');
        globalThis.onerror = (event, source, lineno, colno, error) => {
            this.hint(`[ERROR] at (${source}:${lineno}:${colno})\n\n${error?.stack||error||'unknow Error'}`, 'error');
        }
        const keyDownCallback = (keyboardEvent) => {
            if (keyboardEvent.which === 13 || keyboardEvent.keyCode === 13) {
                const pressEnterFunc = this.#pages[this.#currentPage]?.pressEnter;
                pressEnterFunc && typeof pressEnterFunc === 'function' && pressEnterFunc();
            }
        }
        globalThis.removeEventListener('keydown', keyDownCallback);
        globalThis.addEventListener('keydown', keyDownCallback);
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
            <button id="achievement">成就</button>
            <button id="specialthanks">特别感谢</button>
            <button id="themeToggleBtn">黑</button>
            <div id="title">
                人生重开模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">这垃圾人生一秒也不想呆了</div>
            </div>
            <button id="restart" class="mainbtn"><span class="iconfont">&#xe6a7;</span>立即重开</button>
            <a id="discord" href="https://discord.gg/U3qrf49NMQ" style="z-index: 9999;" aria-label="Chat on Discord"><button class="discord-btn"><svg width="50%" height="55" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff"/></g><defs><clipPath id="clip0"><rect width="71" height="55" fill="white"/></clipPath></defs></svg>CHAT</button><style>.discord-btn {position: fixed;bottom: 0.5rem;left: 0.5rem;background-color: #5865F2;padding: 0.7rem;height: auto;color: white;text-align: right;vertical-align: middle;border: none;width: 6.5rem;font-size: 1rem;border-radius: 4px;}.discord-btn svg {height: 1.5rem;position: absolute;top: 50%;left: 0;transform: translateY(-50%);}.discord-btn:hover svg{animation:discord-wave 560ms ease-in-out;}@keyframes discord-wave{0%,100%{transform:translateY(-50%) rotate(0)}20%,60%{transform:translateY(-50%) rotate(-25deg)}40%,80%{transform:translateY(-50%) rotate(10deg)}}@media (max-width:500px){.discord-btn:hover svg{animation:none}.discord-btn svg{animation:discord-wave 560ms ease-in-out}}</style></a>
        </div>
        `);

        // Init theme
        this.setTheme(localStorage.getItem('theme'))

        indexPage
            .find('#restart')
            .click(()=>this.switch('talent'));

        indexPage
            .find('#achievement')
            .click(()=>this.switch('achievement'));

        if(localStorage.getItem('theme') == 'light') {
            indexPage.find('#themeToggleBtn').text('黑')
        } else{
            indexPage.find('#themeToggleBtn').text('白')
        }

        indexPage
            .find("#themeToggleBtn")
            .click(() => {
                if(localStorage.getItem('theme') == 'light') {
                    localStorage.setItem('theme', 'dark');
                    indexPage.find('#themeToggleBtn').text('白')
                } else {
                    localStorage.setItem('theme', 'light');
                    indexPage.find('#themeToggleBtn').text('黑')
                }

                this.setTheme(localStorage.getItem('theme'))
            });

        indexPage
            .find('#specialthanks')
            .click(()=>this.switch('specialthanks'));

        const specialThanksPage = $(`
        <div id="main">
            <button id="specialthanks">返回</button>
            <div id="spthx">
                <ul class="g1"></ul>
                <ul class="g2"></ul>
            </div>
            <button class="sponsor" onclick="globalThis.open('https://afdian.net/@LifeRestart')" style="background: linear-gradient(90deg,#946ce6,#7e5fd9); left:auto; right:50%; transform: translate(-2rem,-50%);">打赏策划(爱发电)</button>
            <button class="sponsor" onclick="globalThis.open('https://dun.mianbaoduo.com/@vickscarlet')" style="background-color:#c69; left:50%; right:auto; transform: translate(2rem,-50%);">打赏程序(顿顿饭)</button>
        </div>
        `);

        specialThanksPage
            .find('#specialthanks')
            .click(()=>this.switch('index'));

        const achievementPage = $(`
        <div id="main">
            <button id="specialthanks">返回</button>
            <span class="title">统计</span>
            <ul id="total"></ul>
            <span style="padding:0.25rem; margin: 0.5rem 0; border: none; background: #ccc;"></span>
            <span class="title">成就<button id="rank">排行榜</button></span>
            <ul id="achievements"></ul>
        `)

        achievementPage
            .find('#specialthanks')
            .click(()=>this.switch('index'));

        achievementPage
            .find('#rank')
            .click(()=>this.hint('别卷了，没有排行榜'));
        // Talent
        const talentPage = $(`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">天赋抽卡</div>
            <button id="random" class="mainbtn" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"">10连抽！</button>
            <ul id="talents" class="selectlist"></ul>
            <button id="next" class="mainbtn">请选择3个</button>
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
                                if(this.#talentSelected.size<3) {
                                    talentPage.find('#next').text('请选择3个')
                                }
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
                                if(this.#talentSelected.size==3) {
                                    talentPage.find('#next').text('开始新人生')
                                }
                            }
                        });
                    });
                talentPage.find('#next').show()
            });

        talentPage
            .find('#next')
            .click(()=>{
                if(this.#talentSelected.size!=3) {
                    this.hint('请选择3个天赋');
                    return;
                }
                talentPage.find('#next').hide()
                this.#totalMax = 20 + this.#life.getTalentAllocationAddition(Array.from(this.#talentSelected).map(({id})=>id));
                this.switch('property');
            })

        // Property
        // hint of extension tobermory.es6-string-html
        const propertyPage = $(/*html*/`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">
                <div>调整初始属性</div>
                <div id="total" style="font-size:1rem; font-weight:normal;">可用属性点：0</div>
            </div>
            <ul id="propertyAllocation" class="propinitial"></ul>
            <ul class="selectlist" id="talentSelectedView"></ul>
            <div class="btn-area">
                <button id="random" class="mainbtn">随机分配</button>
                <button id="start" class="mainbtn">开始新人生</button>
            </div>
        </div>
        `);
        propertyPage.mounted = ()=>{
            propertyPage
            .find('#talentSelectedView').append(
                `<li>已选天赋</li>` +
                Array.from(this.#talentSelected)
                .map(({name,description})=>`<li class="grade0b">${name}(${description})</li>`)
                .join('')
            )
        }
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
                if(total() >= this.#totalMax) {
                    this.hint('没有可分配的点数了');
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
                if(total() < this.#totalMax) {
                    this.hint(`你还有${this.#totalMax-total()}属性点没有分配完`);
                    return;
                } else if (total() > this.#totalMax) {
                    this.hint(`你多使用了${total() - this.#totalMax}属性点`);
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
                // $(document).keydown(function(event){
                //     if(event.which == 32 || event.which == 13){
                //         $('#lifeTrajectory').click();
                //     }
                // })
            });

        // Trajectory
        const trajectoryPage = $(`
        <div id="main">
            <ul id="lifeProperty" class="lifeProperty"></ul>
            <ul id="lifeTrajectory" class="lifeTrajectory"></ul>
            <div class="btn-area">
                <button id="auto" class="mainbtn">自动播放</button>
                <button id="auto2x" class="mainbtn">自动播放2x</button>
                <button id="summary" class="mainbtn">人生总结</button>
                <button id="domToImage" class="mainbtn">人生回放</button>
            </div>
            <div class="domToImage2wx">
                <img src="" id="endImage" />
            </div>
        </div>
        `);

        trajectoryPage
            .find('#lifeTrajectory')
            .click(()=>{
                if(this.#isEnd) return;
                const trajectory = this.#life.next();
                const { age, content, isEnd } = trajectory;
                const li = $(`<li><span>${age}岁：</span><span>${
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
                }</span></li>`);
                li.appendTo('#lifeTrajectory');
                $("#lifeTrajectory").scrollTop($("#lifeTrajectory")[0].scrollHeight);
                if(isEnd) {
                    $(document).unbind("keydown");
                    this.#isEnd = true;
                    trajectoryPage.find('#summary').show();
                    trajectoryPage.find('#auto').hide();
                    trajectoryPage.find('#auto2x').hide();
                    // trajectoryPage.find('#domToImage').show();
                }
                const property = this.#life.getLastRecord();
                $("#lifeProperty").html(`
                <li><span>颜值</span><span>${property.CHR}</span></li>
                <li><span>智力</span><span>${property.INT}</span></li>
                <li><span>体质</span><span>${property.STR}</span></li>
                <li><span>家境</span><span>${property.MNY}</span></li>
                <li><span>快乐</span><span>${property.SPR}</span></li>
                `);
            });
        // html2canvas
        trajectoryPage
            .find('#domToImage')
            .click(()=>{
                $("#lifeTrajectory").addClass("deleteFixed");
                const ua = navigator.userAgent.toLowerCase();
                domtoimage.toJpeg(document.getElementById('lifeTrajectory'))
                    .then(function (dataUrl) {
                        let link = document.createElement('a');
                        link.download = '我的人生回放.jpeg';
                        link.href = dataUrl;
                        link.click();
                        $("#lifeTrajectory").removeClass("deleteFixed");
                        // 微信内置浏览器，显示图片，需要用户单独保存
                        if(ua.match(/MicroMessenger/i)=="micromessenger") {
                            $('#endImage').attr('src', dataUrl);
                        }

                    });
            })
            .hide();

        trajectoryPage
            .find('#summary')
            .click(()=>{
                clearInterval(this.#autoTrajectory);
                this.#autoTrajectory = null;
                this.switch('summary');
            });

        const auto = tick=>{
            if(this.#autoTrajectory) {
                clearInterval(this.#autoTrajectory);
                this.#autoTrajectory = null;
            } else {
                if(!this.isEnd)
                    trajectoryPage
                        .find('#lifeTrajectory')
                        .click();
                this.#autoTrajectory = setInterval(()=>{
                    if(this.isEnd) {
                        clearInterval(this.#autoTrajectory);
                        this.#autoTrajectory = null;
                    } else {
                        trajectoryPage
                            .find('#lifeTrajectory')
                            .click();
                    }
                }, tick);
            }
        };

        trajectoryPage
            .find('#auto')
            .click(()=>auto(1000));
        trajectoryPage
            .find('#auto2x')
            .click(()=>auto(500));

        // Summary
        const summaryPage = $(`
        <div id="main">
            <div class="head">人生总结</div>
            <ul id="judge" class="judge">
                <li class="grade2"><span>颜值：</span><span>9级 美若天仙</span></li>
                <li class="grade0"><span>智力：</span><span>4级 智力一般</span></li>
                <li class="grade0"><span>体质：</span><span>1级 极度虚弱</span></li>
                <li class="grade0"><span>家境：</span><span>6级 小康之家</span></li>
                <li class="grade0"><span>享年：</span><span>3岁 早夭</span></li>
                <li class="grade0"><span>快乐：</span><span></span>3级 不太幸福的人生</li>
            </ul>
            <div class="head" style="height:auto;">天赋，你可以选一个，下辈子还能抽到</div>
            <ul id="talents" class="selectlist" style="flex: 0 1 auto;">
                <li class="grade2b">黑幕（面试一定成功）</li>
            </ul>
            <button id="again" class="mainbtn"><span class="iconfont">&#xe6a7;</span>再次重开</button>
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
                clear: ()=>{
                    this.#currentPage = 'loading';
                },
            },
            index: {
                page: indexPage,
                btnAchievement: indexPage.find('#achievement'),
                btnRestart: indexPage.find('#restart'),
                hint: indexPage.find('.hint'),
                pressEnter: ()=>{
                    this.#pages.index.btnRestart.click();
                },
                clear: ()=>{
                    this.#currentPage = 'index';
                    indexPage.find('.hint').hide();

                    const times = this.times;
                    const achievement = indexPage.find('#achievement');
                    const discord = indexPage.find('#discord');
                    const specialthanks = indexPage.find('#specialthanks');

                    if(times > 0) {
                        achievement.show();
                        discord.show();
                        specialthanks.show();
                        return;
                    }

                    achievement.hide();
                    discord.hide();
                    specialthanks.hide();
                },
            },
            specialthanks: {
                page: specialThanksPage,
                clear: () => {
                    const groups = [
                        specialThanksPage.find('#spthx > ul.g1'),
                        specialThanksPage.find('#spthx > ul.g2'),
                    ];
                    groups.forEach(g=>g.empty());
                    this.#specialthanks
                        .sort(()=>0.5-Math.random())
                        .forEach(({group, name, comment, color})=>groups[--group].append(`
                            <li>
                                <span class="name" ${color?('style="color:'+color+'"'):''}>${name}</span>
                                <span class="comment">${comment||''}</span>
                            </li>
                        `))
                }
            },
            achievement: {
                page: achievementPage,
                clear: () => {
                    const total = achievementPage.find("ul#total");
                    const achievements = achievementPage.find("ul#achievements");
                    total.empty();
                    achievements.empty();

                    const formatRate = (type, value) => {
                        const rate = getRate(type, value);
                        let color = Object.keys(rate)[0];
                        switch(parseInt(color)) {
                            case 0: color = '白色'; break;
                            case 1: color = '蓝色'; break;
                            case 2: color = '紫色'; break;
                            case 3: color = '橙色'; break;
                            default: break;
                        }
                        let r = Object.values(rate)[0];
                        switch(parseInt(r)) {
                            case 1: r = '不变'; break;
                            case 2: r = '翻倍'; break;
                            case 3: r = '三倍'; break;
                            case 4: r = '四倍'; break;
                            case 5: r = '五倍'; break;
                            case 6: r = '六倍'; break;
                            default: break;
                        }
                        return `抽到${color}概率${r}`;
                    }

                    const { times, achievement, talentRate, eventRate } = this.#life.getTotal();
                    total.append(`
                        <li class="achvg${getGrade('times', times)}"><span class="achievementtitle">已重开${times}次</span>${formatRate('times', times)}</li>
                        <li class="achvg${getGrade('achievement', achievement)}"><span class="achievementtitle">成就达成${achievement}个</span>${formatRate('achievement', achievement)}</li>
                        <li class="achvg${getGrade('eventRate', eventRate)}"><span class="achievementtitle">事件收集率</span>${Math.floor(eventRate * 100)}%</li>
                        <li class="achvg${getGrade('talentRate', talentRate)}"><span class="achievementtitle">天赋收集率</span>${Math.floor(talentRate * 100)}%</li>
                    `);

                    const achievementsData = this.#life.getAchievements();
                    achievementsData.forEach(({
                        name, description, hide,
                        grade, isAchieved
                    })=>{
                        if(hide && !isAchieved) name = description = '???';
                        achievements.append(
                            `<li class="achvg${grade} ${isAchieved?'':'mask'}"><span class="achievementtitle">${name}</span>${description}</li>`
                        );
                    })

                }
            },
            talent: {
                page: talentPage,
                talentList: talentPage.find('#talents'),
                btnRandom: talentPage.find('#random'),
                btnNext: talentPage.find('#next'),
                pressEnter: ()=>{
                    const talentList = this.#pages.talent.talentList;
                    const btnRandom = this.#pages.talent.btnRandom;
                    const btnNext = this.#pages.talent.btnNext;
                    if (talentList.children().length) {
                        btnNext.click();
                    } else {
                        btnRandom.click();
                    }
                },
                clear: ()=>{
                    this.#currentPage = 'talent';
                    talentPage.find('ul.selectlist').empty();
                    talentPage.find('#random').show();
                    this.#totalMax = 20;
                },
            },
            property: {
                page: propertyPage,
                btnStart: propertyPage.find('#start'),
                pressEnter: ()=>{
                    this.#pages.property.btnStart.click();
                },
                clear: ()=>{
                    this.#currentPage = 'property';
                    freshTotal();
                    propertyPage
                        .find('#talentSelectedView')
                        .empty();
                },
            },
            trajectory: {
                page: trajectoryPage,
                lifeTrajectory: trajectoryPage.find('#lifeTrajectory'),
                pressEnter: ()=>{
                    this.#pages.trajectory.lifeTrajectory.click();
                },
                clear: ()=>{
                    this.#currentPage = 'trajectory';
                    trajectoryPage.find('#lifeTrajectory').empty();
                    trajectoryPage.find('#summary').hide();
                    trajectoryPage.find('#auto').show();
                    trajectoryPage.find('#auto2x').show();
                    this.#isEnd = false;
                },
                born: ()=>{
                    trajectoryPage.find('#lifeTrajectory').trigger("click");
                }
            },
            summary: {
                page: summaryPage,
                clear: ()=>{
                    this.#currentPage = 'summary';
                    const judge = summaryPage.find('#judge');
                    const talents = summaryPage.find('#talents');
                    judge.empty();
                    talents.empty();
                    const lastExtendTalent = this.#life.getLastExtendTalent();
                    Array
                        .from(this.#talentSelected)
                        .sort((
                            {id:a, grade:ag},
                            {id:b, grade:bg},
                        )=>{
                            if(a == lastExtendTalent) return -1;
                            if(b == lastExtendTalent) return 1;
                            return bg - ag;
                        })
                        .forEach((talent, i)=>{
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
                            if(!i) li.click();
                        });

                    const summaryData = this.#life.getSummary();
                    const format = (discription, type)=>{
                        const value = summaryData[type];
                        const { judge, grade } = summary(type, value);
                        return `<li class="grade${grade}"><span>${discription}：</span><span>${value} ${judge}</span></li>`;
                    };

                    judge.append(`
                        ${format('颜值', 'CHR')}
                        ${format('智力', 'INT')}
                        ${format('体质', 'STR')}
                        ${format('家境', 'MNY')}
                        ${format('快乐', 'SPR')}
                        ${format('享年', 'AGE')}
                        ${format('总评', 'SUM')}
                    `);
                }
            },
        }

        $$on('achievement', ({name})=>{
            this.hint(`解锁成就【${name}】`, 'success');
        })
    }

    switch(page) {
        const p = this.#pages[page];
        if(!p) return;
        $('#main').detach();
        p.clear();
        p.page.appendTo('body');
        if(typeof p.page.mounted === 'function'){
            p.page.mounted()
        }
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

    setTheme(theme) {
        const themeLink = $(document).find('#themeLink');

        if(theme == 'light') {
            themeLink.attr('href', 'light.css');
        } else {
            themeLink.attr('href', 'dark.css');
        }
    }

    get times() {return this.#life?.times || 0;}
    set times(v) { if(this.#life) this.#life.times = v };

}

export default App;
