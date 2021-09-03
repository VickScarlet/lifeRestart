(function(window){
    function App(){
        this.life = new Life();
        this.pages={};
        this.talentSelected = [];
        this.totalMax=20;
        this.isEnd = false;
        this.selectedExtendTalent = null;
        this.hintTimeout=null;
    }
    App.prototype = {
        initial() {
            this.initPages();
            this.switch('loading');
            this.life.initial(function () {
                this.switch('index');
                window.onerror = function (event, source, lineno, colno, error) {
                    this.hint(`[ERROR] at (${source}:${lineno}:${colno})\n\n${(error?error.stack:error)||'unknow Error'}`, 'error');
                }.bind(this);
            }.bind(this));
        },
        initPages() {
            // Loading
            var loadingPage = $(`
                <div id="main">
                    <div id="title">
                        人生重开模拟器<br>
                        <div style="font-size:1.5rem; font-weight:normal;">加载中...</div>
                    </div>
                </div>
            `);

            // Index
            var indexPage = $(`
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

            indexPage.find('#restart').click(function(){
                return this.switch('talent');
            }.bind(this));

            indexPage.find('#rank').click(function() {
                this.hint('别卷了！没有排行榜');
            }.bind(this));

            // Talent
            const talentPage = $(`
                <div id="main">
                    <div class="head" style="font-size: 1.6rem">天赋抽卡</div>
                    <button id="random" class="mainbtn" style="top: 50%;">10连抽！</button>
                    <ul id="talents" class="selectlist"></ul>
                    <button id="next" class="mainbtn" style="top:auto; bottom:0.1em">请选择3个</button>
                </div>
            `);

            var createTalent = function ({ grade, name, description }) {
                return $(`<li class="grade${grade}b">${name}（${description}）</li>`);
            };

            talentPage.find('#random').click(function(){
                talentPage.find('#random').hide();
                var ul = talentPage.find('#talents');
                this.life.talentRandom().forEach(talent=>{
                    var li = createTalent(talent);
                    ul.append(li);
                    li.click(function (){
                        if(li.hasClass('selected')) {
                            li.removeClass('selected');
                            var inx = -1;
                            for (var tanlentInx in this.talentSelected){
                                if(this.talentSelected.hasOwnProperty(tanlentInx)){
                                    if(this.talentSelected[tanlentInx].id===talent.id){
                                        inx = tanlentInx;
                                    }
                                }
                            }
                            if(~inx){
                                this.talentSelected.splice(inx,1);
                            }
                        } else {
                            if(this.talentSelected.length==3) {
                                this.hint('只能选3个天赋');
                                return;
                            }

                            var exclusive = this.life.exclusive(
                                this.talentSelected.map(function(item){
                                    return item.id;
                                }),
                                talent.id
                            );
                            if(exclusive != null) {
                                for(var inxKey in this.talentSelected){
                                    if(this.talentSelected.hasOwnProperty(inxKey)){
                                        var name = this.talentSelected[inxKey].name;
                                        var id = this.talentSelected[inxKey].id;
                                        if(id == exclusive) {
                                            this.hint(`与已选择的天赋【${name}】冲突`);
                                            return;
                                        }
                                    }
                                }
                                return;
                            }
                            li.addClass('selected');
                            this.talentSelected.push(talent);
                        }
                    }.bind(this));
                });
            }.bind(this));
            talentPage.find('#next').click(function (){
                if(this.talentSelected.length!=3) {
                    this.hint('请选择3个天赋');
                    return;
                }
                this.totalMax = 20 + this.life.getTalentAllocationAddition(this.talentSelected.map(function(item){return item.id}));
                this.switch('property');
            }.bind(this));

            // Property
            var propertyPage = $(`
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

            var groups = {};
            var total = function (){
                let t = 0;
                for(const type in groups)
                    t += groups[type].get();
                return t;
            };
            var freshTotal = function (){
                propertyPage.find('#total').text(`可用属性点：${this.totalMax - total()}`);
            };
            var getBtnGroups = function (name, min, max){
                var group = $(`<li>${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>`);
                var btnSub = $(`<span class="iconfont propbtn">&#xe6a5;</span>`);
                var inputBox = $(`<input value="0">`);
                var btnAdd = $(`<span class="iconfont propbtn">&#xe6a6;</span>`);
                group.append(btnSub);
                group.append(inputBox);
                group.append(btnAdd);

                var limit = v=>{
                    v = Number(v)||0;
                    v = Math.round(v);
                    return v < min ? min : (
                        v > max ? max : v
                    );
                };
                var get = ()=>Number(inputBox.val());
                var set = v=>{
                    inputBox.val(limit(v));
                    freshTotal();
                };
                btnAdd.click(()=>{
                    if(total() == this.totalMax) {
                        this.hint('没用可分配的点数了');
                        return;
                    }
                    set(get()+1);
                });
                btnSub.click(()=>set(get()-1));
                inputBox.on('input', ()=>{
                    var t = total();
                    let val = get();
                    if(t > this.totalMax) {
                        val -= t - this.totalMax;
                    }
                    val = limit(val);
                    if(val != inputBox.val()) {
                        set(val);
                    }
                    freshTotal();
                });
                return {group, get, set};
            }.bind(this);

            groups.CHR = getBtnGroups("颜值", 0, 10); // 颜值 charm CHR
            groups.INT = getBtnGroups("智力", 0, 10); // 智力 intelligence INT
            groups.STR = getBtnGroups("体质", 0, 10); // 体质 strength STR
            groups.MNY = getBtnGroups("家境", 0, 10); // 家境 money MNY

            var ul = propertyPage.find('#propertyAllocation');

            for(var type in groups) {
                ul.append(groups[type].group);
            }

            propertyPage.find('#random').click(function (){
                var t = this.totalMax;
                var arr = [10, 10, 10, 10];
                while(t>0) {
                    var sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1;
                    while(true) {
                        var select = Math.floor(Math.random() * 4) % 4;
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
            }.bind(this));

            propertyPage.find('#start').click(function (){
                if(total()!=this.totalMax) {
                    this.hint(`你还有${this.totalMax-total()}属性点没有分配完`);
                    return;
                }
                this.life.restart({
                    CHR: groups.CHR.get(),
                    INT: groups.INT.get(),
                    STR: groups.STR.get(),
                    MNY: groups.MNY.get(),
                    SPR: 5,
                    TLT: this.talentSelected.map(function (item){return item.id;}),
                });
                this.switch('trajectory');
                this.pages.trajectory.born();
            }.bind(this));

            // Trajectory
            var trajectoryPage = $(`
                <div id="main">
                    <ul id="lifeTrajectory" class="lifeTrajectory"></ul>
                    <button id="summary" class="mainbtn" style="top:auto; bottom:0.1rem">人生总结</button>
                </div>
            `);

            trajectoryPage.find('#lifeTrajectory').click(function (){
                if(this.isEnd) return;
                var trajectory = this.life.next();
                var  age = trajectory.age;
                var  content = trajectory.content;
                var  isEnd = trajectory.isEnd;

                var li = $(`<li><span>${age}岁：</span>${
                    content.map(
                        function (item) {
                            switch(item.type) {
                                case 'TLT':
                                    return `天赋【${item.name}】发动：${item.description}`;
                                case 'EVT':
                                    return item.description + (item.postEvent?`<br>${item.postEvent}`:'');
                            }
                        }
                    ).join('<br>')
                }</li>`);
                li.appendTo('#lifeTrajectory');
                $("#lifeTrajectory").scrollTop($("#lifeTrajectory")[0].scrollHeight);
                if(isEnd) {
                    this.isEnd = true;
                    trajectoryPage.find('#summary').show();
                }
            }.bind(this));

            trajectoryPage.find('#summary').click(function (){
                this.switch('summary');
            }.bind(this));

            // Summary
            var summaryPage = $(`
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

            summaryPage.find('#again').click(function (){
                this.times ++;
                this.life.talentExtend(this.selectedExtendTalent);
                this.selectedExtendTalent = null;
                this.talentSelected=[];
                this.totalMax = 20;
                this.isEnd = false;
                this.switch('index');
            }.bind(this));
            this.pages = {
                loading: {
                    page: loadingPage,
                    clear: function(){},
                },
                index: {
                    page: indexPage,
                    btnRank: indexPage.find('#rank'),
                    btnRestart: indexPage.find('#restart'),
                    hint: indexPage.find('.hint'),
                    cnt: indexPage.find('#cnt'),
                    clear: function(){
                        indexPage.find('.hint').hide();

                        var times = this.times;
                        var btnRank = indexPage.find('#rank');
                        var cnt = indexPage.find('#cnt');
                        if(times > 0) {
                            btnRank.show();
                            cnt.show();
                            cnt.text(`已重开${times}次`);
                            return;
                        }

                        btnRank.hide();
                        cnt.hide();
                    }.bind(this),
                },
                talent: {
                    page: talentPage,
                    clear: function (){
                        talentPage.find('ul.selectlist').empty();
                        talentPage.find('#random').show();
                        this.totalMax = 20;
                    }.bind(this),
                },
                property: {
                    page: propertyPage,
                    clear: function (){
                        freshTotal();
                    },
                },
                trajectory: {
                    page: trajectoryPage,
                    clear: function(){
                        trajectoryPage.find('#lifeTrajectory').empty();
                        trajectoryPage.find('#summary').hide();
                        this.isEnd = false;
                    }.bind(this),
                    born: function(){
                        trajectoryPage.find('#lifeTrajectory').trigger("click");
                    }
                },
                summary: {
                    page: summaryPage,
                    clear: function(){
                        var judge = summaryPage.find('#judge');
                        var talents = summaryPage.find('#talents');
                        judge.empty();
                        talents.empty();
                        this.talentSelected.forEach(function(talent){
                            var li = createTalent(talent);
                            talents.append(li);
                            li.click(function(){
                                if(li.hasClass('selected')) {
                                    this.selectedExtendTalent = null;
                                    li.removeClass('selected');
                                } else if(this.selectedExtendTalent != null) {
                                    this.hint('只能继承一个天赋');
                                    return;
                                } else {
                                    this.selectedExtendTalent = talent.id;
                                    li.addClass('selected');
                                }
                            }.bind(this));
                        }.bind(this));

                        var records = this.life.getRecord();
                        var s = function (type, func){
                            var value = func(records.map(({[type]:v})=>v));
                            var obj = summary(type, value);
                            var judge = obj.judge;
                            var grade = obj.grade;
                            return { judge, grade, value };
                        }.bind(this);
                        console.table(records);
                        console.debug(records);

                        judge.append([
                            (function(){
                                var obj = s('CHR', max);
                                var judge = obj.judge;
                                var grade = obj.grade;
                                var value = obj.value;
                                return `<li class="grade${grade}"><span>颜值：</span>${value} ${judge}</li>`;
                            })(),
                            (function(){
                                var obj = s('INT', max);
                                var judge = obj.judge;
                                var grade = obj.grade;
                                var value = obj.value;
                                return `<li class="grade${grade}"><span>智力：</span>${value} ${judge}</li>`;
                            })(),
                            (function(){
                                var obj = s('STR', max);
                                var judge = obj.judge;
                                var grade = obj.grade;
                                var value = obj.value;
                                return `<li class="grade${grade}"><span>体质：</span>${value} ${judge}</li>`;
                            })(),
                            (function(){
                                var obj = s('MNY', max);
                                var judge = obj.judge;
                                var grade = obj.grade;
                                var value = obj.value;
                                return `<li class="grade${grade}"><span>家境：</span>${value} ${judge}</li>`;
                            })(),
                            (function(){
                                var obj = s('SPR', max);
                                var judge = obj.judge;
                                var grade = obj.grade;
                                var value = obj.value;
                                return `<li class="grade${grade}"><span>快乐：</span>${value} ${judge}</li>`;
                            })(),
                            (function(){
                                var obj = s('AGE', max);
                                var judge = obj.judge;
                                var grade = obj.grade;
                                var value = obj.value;
                                return `<li class="grade${grade}"><span>享年：</span>${value} ${judge}</li>`;
                            })(),
                            (function(){
                                var m = function(type){
                                    return max(records.map(function(item) {
                                        return item[type];
                                    }));
                                };
                                console.log(m)
                                var value = Math.floor(sum(m('CHR'), m('INT'), m('STR'), m('MNY'), m('SPR'))*2 + m('AGE')/2);
                                var obj = summary('SUM', value);
                                var judge = obj.judge;
                                var grade = obj.grade;

                                return `<li class="grade${grade}"><span>总评：</span>${value} ${judge}</li>`;
                            })(),
                        ].join(''));
                    }.bind(this)
                }
            };
        },

        switch(page) {
            var p = this.pages[page];
            if(!p) return;
            $('#main').detach();
            p.clear();
            p.page.appendTo('body');
        },

        hint(message, type='info') {
            if(this.hintTimeout) {
                clearTimeout(this.hintTimeout);
                this.hintTimeout = null;
            }
            hideBanners();
            requestAnimationFrame(function() {
                var banner = $(`.banner.${type}`);
                banner.addClass('visible');
                banner.find('.banner-message').text(message);
                if(type != 'error') {
                    this.hintTimeout = setTimeout(hideBanners, 3000);
                }
            });
        },

        get times() {
            return JSON.parse(localStorage.times||'0') || 0;
        },
        set times(v) {
            localStorage.times = JSON.stringify(parseInt(v) || 0);
        }
    };
    window.App = App;
})(window);
