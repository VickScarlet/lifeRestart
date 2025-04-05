import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import { readFile } from 'fs/promises'
import Life from '../src/modules/life.js'
import $lang from '../src/i18n/zh-cn.js'
globalThis.$lang = $lang

globalThis.json = async fileName =>
    JSON.parse(await readFile(`${__dirname}/../public/data/${fileName}.json`))

globalThis.$$eventMap = new Map()
globalThis.$$event = (tag, data) => {
    const listener = $$eventMap.get(tag)
    if (listener) listener.forEach(fn => fn(data))
}
globalThis.$$on = (tag, fn) => {
    let listener = $$eventMap.get(tag)
    if (!listener) {
        listener = new Set()
        $$eventMap.set(tag, listener)
    }
    listener.add(fn)
}
globalThis.$$off = (tag, fn) => {
    const listener = $$eventMap.get(tag)
    if (listener) listener.delete(fn)
}

class App {
    constructor() {
        this.#life.config({
            defaultPropertyPoints: 20, // default number of points for a property
            talentSelectLimit: 3, // max number of talents that can be selected
            propertyAllocateLimit: [0, 10], // scoop of properties that can be allocated,
            defaultPropertys: { SPR: 5 }, // default properties
            talentConfig: {
                // config for talent
                talentPullCount: 10, // number of talents to pull from the talent pool
                talentRate: { 1: 100, 2: 10, 3: 1, total: 1000 }, // rate of talent pull
                additions: {
                    TMS: [
                        [10, { 2: 1 }],
                        [30, { 2: 2 }],
                        [50, { 2: 3 }],
                        [70, { 2: 4 }],
                        [100, { 2: 5 }],
                    ],
                    CACHV: [
                        [10, { 2: 1 }],
                        [30, { 2: 2 }],
                        [50, { 2: 3 }],
                        [70, { 2: 4 }],
                        [100, { 2: 5 }],
                    ],
                },
            },
            propertyConfig: {
                // config for property
                judge: {
                    // type: [min, grade, judge]
                    RTLT: [
                        [0, 0],
                        [0.3, 1],
                        [0.6, 2],
                        [0.9, 3],
                    ],
                    REVT: [
                        [0, 0],
                        [0.2, 1],
                        [0.4, 2],
                        [0.6, 3],
                    ],
                    TMS: [
                        [0, 0, 'UI_Remake_Times_Judge_Level_0'],
                        [10, 1, 'UI_Remake_Times_Judge_Level_1'],
                        [30, 1, 'UI_Remake_Times_Judge_Level_2'],
                        [50, 2, 'UI_Remake_Times_Judge_Level_3'],
                        [70, 2, 'UI_Remake_Times_Judge_Level_4'],
                        [100, 3, 'UI_Remake_Times_Judge_Level_5'],
                    ],
                    CACHV: [
                        [0, 0, 'UI_Achievement_Count_Judge_Level_0'],
                        [10, 1, 'UI_Achievement_Count_Judge_Level_1'],
                        [30, 1, 'UI_Achievement_Count_Judge_Level_2'],
                        [50, 2, 'UI_Achievement_Count_Judge_Level_3'],
                        [70, 2, 'UI_Achievement_Count_Judge_Level_4'],
                        [100, 3, 'UI_Achievement_Count_Judge_Level_5'],
                    ],
                    HCHR: [
                        [0, 0, 'UI_Judge_Level_0'],
                        [1, 0, 'UI_Judge_Level_1'],
                        [2, 0, 'UI_Judge_Level_2'],
                        [4, 0, 'UI_Judge_Level_3'],
                        [7, 1, 'UI_Judge_Level_4'],
                        [9, 2, 'UI_Judge_Level_5'],
                        [11, 3, 'UI_Judge_Level_6'],
                    ],
                    HMNY: [
                        [0, 0, 'UI_Judge_Level_0'],
                        [1, 0, 'UI_Judge_Level_1'],
                        [2, 0, 'UI_Judge_Level_2'],
                        [4, 0, 'UI_Judge_Level_3'],
                        [7, 1, 'UI_Judge_Level_4'],
                        [9, 2, 'UI_Judge_Level_5'],
                        [11, 3, 'UI_Judge_Level_6'],
                    ],
                    HSPR: [
                        [0, 0, 'UI_Spirit_Judge_Level_0'],
                        [1, 0, 'UI_Spirit_Judge_Level_1'],
                        [2, 0, 'UI_Spirit_Judge_Level_2'],
                        [4, 0, 'UI_Spirit_Judge_Level_3'],
                        [7, 1, 'UI_Spirit_Judge_Level_4'],
                        [9, 2, 'UI_Spirit_Judge_Level_5'],
                        [11, 3, 'UI_Spirit_Judge_Level_6'],
                    ],
                    HINT: [
                        [0, 0, 'UI_Judge_Level_0'],
                        [1, 0, 'UI_Judge_Level_1'],
                        [2, 0, 'UI_Judge_Level_2'],
                        [4, 0, 'UI_Judge_Level_3'],
                        [7, 1, 'UI_Judge_Level_4'],
                        [9, 2, 'UI_Judge_Level_5'],
                        [11, 3, 'UI_Judge_Level_6'],
                        [21, 3, 'UI_Intelligence_Judge_Level_7'],
                        [131, 3, 'UI_Intelligence_Judge_Level_8'],
                        [501, 3, 'UI_Intelligence_Judge_Level_9'],
                    ],
                    HSTR: [
                        [0, 0, 'UI_Judge_Level_0'],
                        [1, 0, 'UI_Judge_Level_1'],
                        [2, 0, 'UI_Judge_Level_2'],
                        [4, 0, 'UI_Judge_Level_3'],
                        [7, 1, 'UI_Judge_Level_4'],
                        [9, 2, 'UI_Judge_Level_5'],
                        [11, 3, 'UI_Judge_Level_6'],
                        [21, 3, 'UI_Strength_Judge_Level_7'],
                        [101, 3, 'UI_Strength_Judge_Level_8'],
                        [401, 3, 'UI_Strength_Judge_Level_9'],
                        [1001, 3, 'UI_Strength_Judge_Level_10'],
                        [2001, 3, 'UI_Strength_Judge_Level_11'],
                    ],
                    HAGE: [
                        [0, 0, 'UI_AGE_Judge_Level_0'],
                        [1, 0, 'UI_AGE_Judge_Level_1'],
                        [10, 0, 'UI_AGE_Judge_Level_2'],
                        [18, 0, 'UI_AGE_Judge_Level_3'],
                        [40, 0, 'UI_AGE_Judge_Level_4'],
                        [60, 1, 'UI_AGE_Judge_Level_5'],
                        [70, 1, 'UI_AGE_Judge_Level_6'],
                        [80, 2, 'UI_AGE_Judge_Level_7'],
                        [90, 2, 'UI_AGE_Judge_Level_8'],
                        [95, 3, 'UI_AGE_Judge_Level_9'],
                        [100, 3, 'UI_AGE_Judge_Level_10'],
                        [500, 3, 'UI_AGE_Judge_Level_11'],
                    ],
                    SUM: [
                        [0, 0, 'UI_Judge_Level_0'],
                        [41, 0, 'UI_Judge_Level_1'],
                        [50, 0, 'UI_Judge_Level_2'],
                        [60, 0, 'UI_Judge_Level_3'],
                        [80, 1, 'UI_Judge_Level_4'],
                        [100, 2, 'UI_Judge_Level_5'],
                        [110, 3, 'UI_Judge_Level_6'],
                        [120, 3, 'UI_Judge_Level_7'],
                    ],
                },
            },
            characterConfig: {
                // config for character
                characterPullCount: 3,
                rateableKnife: 10,
                propertyWeight: [
                    [0, 1],
                    [1, 2],
                    [2, 3],
                    [3, 4],
                    [4, 5],
                    [5, 6],
                    [6, 5],
                    [7, 4],
                    [8, 3],
                    [9, 2],
                    [10, 1],
                ],
                talentWeight: [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 2],
                    [5, 1],
                ],
            },
        })
    }

    Steps = {
        TALENT: 'talent',
        PROPERTY: 'property',
        TRAJECTORY: 'trajectory',
        SUMMARY: 'summary',
    }
    #language = 'zh-cn'
    #step = this.Steps.SUMMARY
    #life = new Life()
    #talentSelected = new Set()
    #talentExtend = new Set()
    #auto
    #isEnd
    #propertyAllocation
    #output
    #exit
    #interval
    #style = {
        warn: ['\x1B[93m', '\x1B[39m'], // Bright Yellow
        grade1: ['\x1B[94m', '\x1B[39m'], // Bright Blue
        grade2: ['\x1B[95m', '\x1B[39m'], // Bright Magenta
        grade3: ['\x1B[93m', '\x1B[39m'], // Bright Yellow
        grade1b: ['\x1B[94m\x1B[7m', '\x1B[0m'], // Bright Blue BG
        grade2b: ['\x1B[95m\x1B[7m', '\x1B[0m'], // Bright Magenta BG
        grade3b: ['\x1B[93m\x1B[7m', '\x1B[0m'], // Bright Yellow BG
    }
    #randomTalents

    style(type, str) {
        const style = this.#style[type]
        if (!style) return str
        return `${style[0]}${str}${style[1]}`
    }

    async initial() {
        this.output('Now Loading...')
        this.#talentExtend = localStorage.talentExtend
        await this.#life.initial(
            dataSet => json(`${this.#language}/${dataSet}`),
            json
        )
        this.output(
            `\rLoading Complete.
人生重开模拟器
这垃圾人生一秒也不想待了

键入 \x1B[4m/remake\x1B[24m 开始游戏
键入 \x1B[4m/help\x1B[24m 获取帮助`,
            true
        )
        $$on('achievement', ({ name }) =>
            this.output(`
-------------------------
    解锁成就【${name}】
-------------------------
`)
        )
    }

    io(input, output, exit) {
        this.#output = output
        this.#exit = exit
        input(command => {
            const ret = this.repl(command)
            if (!ret) return
            if (typeof ret == 'string') return this.output(ret, true)
            if (Array.isArray(ret)) return this.output(...ret)
            const { message, isRepl } = ret
            return this.output(message, isRepl)
        })
    }

    output(data, isRepl) {
        if (!this.#output) return
        this.#output(data, isRepl)
    }

    exit(code) {
        if (this.#exit) this.#exit(code)
        process.exit(code)
    }

    repl(command) {
        command = command.split(/\s+/)
        switch (command.shift()) {
            case 'r':
            case 'remake':
            case '/remake':
                return this.remake()

            case 's':
            case 'select':
            case '/select':
                return this.select(...command)

            case 'u':
            case 'unselect':
            case '/unselect':
                return this.unselect(...command)

            case 'n':
            case 'next':
            case '/next':
            case '':
                return this.next(true)

            case 'a':
            case 'alloc':
            case 'allocate':
            case 'attrib':
            case 'attribute':
            case '/alloc':
            case '/allocate':
            case '/attrib':
            case '/attribute':
                return this.attrib(...command)

            case 'rd':
            case 'random':
            case '/random':
                return this.random()

            case 'at':
            case 'auto':
            case '/auto':
                return this.auto(...command)

            case 'x':
            case 'exit':
            case '/exit':
                return this.exit(0)

            case '?':
            case 'h':
            case 'help':
            case '/?':
            case '/h':
            case '/help':
            default:
                return this.help(...command)
        }
    }

    help(key) {
        switch (key) {
            case 'x':
            case 'exit':
            case '/exit':
                return `退出
    x, exit, /exit      命令同等效果`

            case 'r':
            case 'remake':
            case '/remake':
                return `重开
    r, remake, /remake  命令同等效果`

            case 's':
            case 'select':
            case '/select':
                return `选择
    s, select, /select  命令同等效果

    Example:    /select 1 2 3 意味着选择 1 2 3 三个天赋

                /select <id1> [id2] [id3]

    参数解释     <id1>   通常来说要指定至少一个id
                        虽然不指定也可以
                [id2]
                [id3]   可以不指定`

            case 'u':
            case 'unselect':
            case '/unselect':
                return `取消选择
    u, unselect,
    /unselect           命令同等效果

    Example:    /unselect 1 2 3
                意味着取消选择 1 2 3 三个天赋

    参数解释     /unselect <id1> [id2] [id3]

                <id1>   通常来说要指定至少一个id
                        虽然不指定也可以
                [id2]
                [id3]   可以不指定`

            case 'a':
            case 'alloc':
            case 'allocate':
            case 'attrib':
            case 'attribute':
            case '/alloc':
            case '/allocate':
            case '/attrib':
            case '/attribute':
                return `分配或查看属性点
    a, alloc, allocate, attrib, attribute
    /alloc, /allocate, /attrib, /attribute 命令同等效果

    Example:    /attribute
                /allocate STR 1
                /allocate INT -3
                /allocate CHR +5

    效果        在属性分配时分配属性点
                在人生的过程中查看当前属性点

    参数解释    /allocate <TAG> <[+/-]value>

                <TAG>   表示要分配的属性标签
                        可选有
                            CHR, chr, c, C 表示颜值
                            INT, int, i, I 表示智力
                            STR, str, s, S 表示体质
                            MNY, mny, m, M 表示家境
                        必填

                <[+/-]value>
                        表示属性的调整
                        其中
                            + 表示在当前基础上增加
                            - 表示在当前基础上减少
                            无符号表示直接设置为此值
                        必填`

            case 'n':
            case 'next':
            case '/next':
                return `继续
    n, next, /next      命令同等效果

    效果                通常用于各步骤结束后
                        例如：  选择天赋后
                                分配属性后
                                每个年龄事件后
                                总评后
                                继承天赋后`

            case 'at':
            case 'auto':
            case '/auto':
                return `自动播放
    at, auto, /auto    命令同等效果

    效果                用于人生的过程中
                        每个年龄会自动下一年
                        播放速度 1 秒 1 年`

            case '?':
            case 'h':
            case 'help':
            case '/?':
            case '/h':
            case '/help':
                return `显示帮助
    ？, h, help
    /?, /h, /help           命令同等效果

    Example:            /help
                        /help /select

    参数解释             /help [command]

            [command]   要详细显示帮助的命令
                        可以不填`
        }
        return `Help ---
    命令            说明            示例
    x
    exit
    /exit           退出            /exit

    r
    remake
    /remake         重开            /remake

    s
    select
    /select         选择天赋        /select <id1> [id2] [id3]

    u
    unselect
    /unselect       取消选择        /unselect <id1> [id2] [id3]

    a
    alloc
    allocate
    attrib
    attribute
    /alloc
    /allocate
    /attrib
    /attribute      分配或查看属性点 /allocate <TAG> <[+/-]value>

    n
    next
    /next           继续            /next

    at
    auto
    /auto           自动播放        /auto

    ?
    h
    help
    /?
    /h
    /help           显示帮助        /help [command]`
    }

    auto(arg) {
        this.#auto = arg != 'off'
        return this.next(true)
    }

    remake() {
        if (this.#talentExtend) {
            this.#life.talentExtend(this.#talentExtend)
            dumpLocalStorage()
            this.#talentExtend = null
        }

        this.#isEnd = false
        this.#talentSelected.clear()
        this.#propertyAllocation = {
            CHR: 0,
            INT: 0,
            STR: 0,
            MNY: 0,
            SPR: 5,
        }
        this.#step = this.Steps.TALENT
        this.#randomTalents = this.#life.talentRandom()
        return this.list()
    }

    select(...select) {
        switch (this.#step) {
            case this.Steps.TALENT:
                return this.talentSelect(...select)
            case this.Steps.SUMMARY:
                return this.talentExtend(...select)
        }
    }

    unselect(...select) {
        switch (this.#step) {
            case this.Steps.TALENT:
                return this.talentUnSelect(...select)
            case this.Steps.SUMMARY:
                return this.talentExtendCancle(...select)
        }
    }

    talentSelect(...select) {
        const warn = str => `${this.list()}\n${this.style('warn', str)}`
        for (const number of select) {
            const s = this.#randomTalents[number]
            if (!s) return warn(`${number} 为未知天赋`)
            if (this.#talentSelected.has(s)) continue
            if (this.#talentSelected.size == 3)
                return warn(
                    '你只能选3个天赋。请使用 \x1B[4m/unselect\x1B[24m 取消选择你不想要的天赋'
                )

            const exclusive = this.#life.exclude(
                Array.from(this.#talentSelected).map(({ id }) => id),
                s.id
            )

            if (exclusive != null)
                for (const { name, id } of this.#talentSelected)
                    if (id == exclusive)
                        return warn(
                            `天赋【${s.name}】与已选择的天赋【${name}】冲突`
                        )

            this.#talentSelected.add(s)
        }

        return this.list()
    }

    talentUnSelect(...select) {
        for (const number of select) {
            const s = this.#randomTalents[number]
            if (this.#talentSelected.has(s)) this.#talentSelected.delete(s)
        }
        return this.list()
    }

    talentExtend(select) {
        const warn = str => `${this.list()}\n${this.style('warn', str)}`
        const list = Array.from(this.#talentSelected)
        const s = list[select]
        if (!s) return warn(`${select} 为未知天赋`)
        this.#talentExtend = s.id
        return this.list()
    }

    talentExtendCancle() {
        this.#talentExtend = null
        return this.list()
    }

    list() {
        let description, list, check
        switch (this.#step) {
            case this.Steps.TALENT:
                description = '🎉 请选择（\x1B[4m/select\x1B[24m）3 个天赋'
                list = this.#randomTalents
                check = talent => this.#talentSelected.has(talent)
                break
            case this.Steps.SUMMARY:
                description =
                    '🎉 你可以选（\x1B[4m/select\x1B[24m）一个天赋继承'
                list = Array.from(this.#talentSelected)
                check = ({ id }) => this.#talentExtend == id
                break
        }
        if (!list) return ''

        return [
            description,
            list.map((talent, i) =>
                this.style(
                    `grade${talent.grade}b`,
                    `${check(talent) ? '√' : ' '} ${i} ${talent.name}（${
                        talent.description
                    }）`
                )
            ),
        ]
            .flat()
            .join('\n')
    }

    next(enter) {
        const warn = (a, b) =>
            `${a}\n${this.style('warn', this.style('warn', b))}`
        switch (this.#step) {
            case this.Steps.TALENT:
                if (this.#talentSelected.size != 3)
                    return warn(this.list(), `请选择 3 个天赋`)
                this.#step = this.Steps.PROPERTY
                this.#life.remake(
                    Array.from(this.#talentSelected).map(({ id }) => id)
                )
                this.#propertyAllocation.total = this.#life.getPropertyPoints()
                return this.prop()
            case this.Steps.PROPERTY:
                const less = this.less()
                if (less > 0)
                    return warn(this.prop(), `你还有 ${less} 属性点没有分配完`)
                this.#step = this.Steps.TRAJECTORY
                delete this.#propertyAllocation.total
                this.#life.start(this.#propertyAllocation)
                return this.trajectory(enter)
            case this.Steps.TRAJECTORY:
                if (!this.#isEnd) return this.trajectory(enter)
                this.#step = this.Steps.SUMMARY
                return `${this.summary()}\n\n${this.list()}`
            case this.Steps.SUMMARY:
                return this.remake()
        }
    }

    trajectory(enter) {
        if (enter) {
            if (this.#interval) {
                clearInterval(this.#interval)
                this.#interval = null
                this.#auto = false
            } else if (this.#auto) {
                this.#interval = setInterval(() => {
                    const trajectory = this.next()
                    if (this.#isEnd && this.#interval) {
                        clearInterval(this.#interval)
                        this.#interval = null
                    }
                    if (!this.#isEnd) return this.output(`${trajectory}\n`)
                    return this.output(trajectory, true)
                }, Number(this.#auto) || 1000)
                return
            }
        }

        const trajectory = this.#life.next()
        const { age, content, isEnd } = trajectory
        if (isEnd) this.#isEnd = true
        return `${age}岁：\t${content
            .map(({ type, description, grade, name, postEvent }) => {
                switch (type) {
                    case 'TLT':
                        return `天赋【${name}】发动：${description}`
                    case 'EVT':
                        return (
                            description + (postEvent ? `\n\t${postEvent}` : '')
                        )
                }
            })
            .join('\n\t')}`
    }

    prop() {
        const { CHR, INT, STR, MNY } = this.#propertyAllocation
        return `🎉 属性分配
请使用 \x1B[4m/alloc\x1B[24m <TAG> <value> 分配属性
剩余点数 ${this.less()}

属性(TAG)       当前值
颜值(CHR)         ${CHR}
智力(INT)         ${INT}
体质(STR)         ${STR}
家境(MNY)         ${MNY}
        `
    }

    less() {
        const { total, CHR, INT, STR, MNY } = this.#propertyAllocation
        return total - CHR - INT - STR - MNY
    }

    attrib(tag, value) {
        switch (this.#step) {
            case this.Steps.PROPERTY:
                return this.alloc(tag, value)

            case this.Steps.TRAJECTORY:
                return this.showProperty()

            default:
                return undefined
        }
    }

    showProperty() {
        let property = this.#life.getLastRecord()
        return `当前属性

属性(TAG)       当前值
颜值(CHR)         ${property.CHR}
智力(INT)         ${property.INT}
体质(STR)         ${property.STR}
家境(MNY)         ${property.MNY}
快乐(SPR)         ${property.SPR}`
    }

    alloc(tag, value) {
        const warn = str => `${this.prop()}\n${this.style('warn', str)}`
        if (!value) return warn('⚠ 分配的数值没有给定')
        const isSet = !(value[0] == '-' || value[0] == '+')

        value = Number(value)
        if (isNaN(value)) return warn('⚠ 分配的数值不正确')

        switch (tag) {
            case 'c':
            case 'chr':
            case 'C':
                tag = 'CHR'
                break
            case 'i':
            case 'int':
            case 'I':
                tag = 'INT'
                break
            case 's':
            case 'S':
            case 'str':
                tag = 'STR'
                break
            case 'm':
            case 'M':
            case 'mny':
                tag = 'MNY'
                break
        }

        switch (tag) {
            case 'CHR':
            case 'INT':
            case 'STR':
            case 'MNY':
                break
            default:
                return warn('⚠ 未知的tag')
        }

        if (isSet) value = value - this.#propertyAllocation[tag]

        const tempLess = this.less() - value
        const tempSet = this.#propertyAllocation[tag] + value

        if (tempLess < 0) return warn('⚠ 你没有更多的点数可以分配了')
        if (tempLess > this.#propertyAllocation.total || tempSet < 0)
            return warn('⚠ 不能分配负数属性')
        if (tempSet > 10) return warn('⚠ 单项属性最高分配10点')

        this.#propertyAllocation[tag] += value

        return this.prop()
    }

    random() {
        switch (this.#step) {
            case this.Steps.TALENT:
                this.#talentSelected.clear()
                Array.from(this.#randomTalents)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .forEach(talent => {
                        this.#talentSelected.add(talent)
                    })
                return this.list()
            case this.Steps.PROPERTY:
                let t = this.#propertyAllocation.total
                const arr = [10, 10, 10, 10]
                while (t > 0) {
                    const sub =
                        Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1
                    while (true) {
                        const select = Math.floor(Math.random() * 4) % 4
                        if (arr[select] - sub < 0) continue
                        arr[select] -= sub
                        t -= sub
                        break
                    }
                }
                this.#propertyAllocation.CHR = 10 - arr[0]
                this.#propertyAllocation.INT = 10 - arr[1]
                this.#propertyAllocation.STR = 10 - arr[2]
                this.#propertyAllocation.MNY = 10 - arr[3]
                return this.prop()
            case this.Steps.SUMMARY:
                this.#talentExtend = Array.from(this.#talentSelected).sort(
                    () => Math.random() - 0.5
                )[0].id
                return this.list()
        }
    }

    summary() {
        const summaryData = this.#life.summary
        const format = (name, type) => {
            const { judge, grade, value } = summaryData[type]
            return this.style(
                `grade${grade}b`,
                `${name}：${value} ${$lang[judge]}`
            )
        }

        return [
            '🎉 总评',
            format('颜值', this.#life.PropertyTypes.HCHR),
            format('智力', this.#life.PropertyTypes.HINT),
            format('体质', this.#life.PropertyTypes.HSTR),
            format('家境', this.#life.PropertyTypes.HMNY),
            format('快乐', this.#life.PropertyTypes.HSPR),
            format('享年', this.#life.PropertyTypes.HAGE),
            format('总评', this.#life.PropertyTypes.SUM),
        ].join('\n')
    }
}

export default App
