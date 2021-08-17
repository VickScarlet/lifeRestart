// const DEFAULT_PROP = {
//     CHR: 5,    // 颜值 charm CHR
//     INT: 5,    // 智力 intelligence INT
//     STR: 5,    // 体质 strength STR
//     MNY: 5,    // 家境 money MNY
//     SPR: 5,    // 快乐 spirit SPR
//     LIF: 5,    // 生命 life LIF
//     TLT: [5],    // 天赋 talent TLT
//     EVT: [5],    // 事件 event EVT
// };

// debug(
//     '(STR<2&MNY>3)|(MNY<2&CHR<2)',
//     '(STR<2&MNY>3)',
//     '(STR>2&MNY>3)',
//     '((((STR>2&MNY>2))))',
//     '((((STR>2&MNY>2)|(MNY<2&CHR<2))))',
//     '((((STR>2&MNY>2)|(MNY<2&CHR<2)&(STR>2&MNY>3))))',
//     '((((STR>2&MNY>2)|(MNY<2&CHR<2))&(STR>2&MNY>3)))',
//     'EVT![1,2,3]',
//     'EVT![1,2]',
//     'EVT?[1,2,3]',
//     'EVT?[1,2]',
// );

// function getProp(prop) {
//     switch(prop) {
//         case 'CHR':
//         case 'INT':
//         case 'STR':
//         case 'MNY':
//         case 'SPR':
//         case 'LIF':
//         case 'TLT':
//         case 'EVT': return DEFAULT_PROP[prop];
//         default: return null;
//     }
// }

// function check(condition) {
//     const conditions = parseCondition(condition);
//     return checkParsedCondition(conditions);
// }

// function checkParsedCondition(conditions) {
//     if(!Array.isArray(conditions)) return checkLogic(conditions);
//     if(conditions.length == 0) return true;
//     if(conditions.length == 1) return checkParsedCondition(conditions[0]);

//     let ret = checkParsedCondition(conditions[0]);
//     for(let i=1; i<conditions.length; i+=2) {
//         switch(conditions[i]) {
//             case '&':
//                 if(ret) ret = checkParsedCondition(conditions[i+1]);
//                 break;
//             case '|':
//                 if(ret) return true;
//                 ret = checkParsedCondition(conditions[i+1]);
//                 break;
//             default: return false;
//         }
//     }
//     return ret;

// }

// function checkLogic(condition) {
//     const length = condition.length;
//     let i = condition.search(/[><\!\?=]/);

//     const prop = condition.substring(0,i);
//     const symbol = condition.substring(i, i+=(condition[i+1]=='='?2:1));
//     const d = condition.substring(i, length);

//     const propData = getProp(prop);
//     const conditionData = d[0]=='['? JSON.parse(d): Number(d);

//     switch(symbol) {
//         case '>':  return propData >  conditionData;
//         case '<':  return propData <  conditionData;
//         case '>=': return propData >= conditionData;
//         case '<=': return propData <= conditionData;
//         case '=':
//             if(Array.isArray(propData))
//                 return propData.includes(conditionData);
//             return propData == conditionData;
//         case '!=':
//             if(Array.isArray(propData))
//                 return !propData.includes(conditionData);
//             return propData == conditionData;
//         case '?':
//             if(Array.isArray(propData)) {
//                 for(const p of propData)
//                     if(conditionData.includes(p)) return true;
//                 return false;
//             }
//             return conditionData.includes(propData);
//         case '!':
//             if(Array.isArray(propData)) {
//                 for(const p of propData)
//                     if(conditionData.includes(p)) return false;
//                 return true;
//             }
//             return !conditionData.includes(propData);

//         default: return false;
//     }
// }

// function parseCondition(condition) {
//     const conditions = [];
//     const length = condition.length;
//     const stack = [];
//     stack.unshift(conditions);
//     let cursor = 0;
//     const catchString = i => {
//         const str = condition.substring(cursor, i).trim();
//         cursor = i;
//         if(str) stack[0].push(str);
//     };

//     for(let i=0; i<length; i++) {
//         switch(condition[i]) {
//             case ' ': continue;

//             case '(':
//                 catchString(i);
//                 cursor ++;
//                 const sub = [];
//                 stack[0].push(sub);
//                 stack.unshift(sub);
//                 break;

//             case ')':
//                 catchString(i);
//                 cursor ++;
//                 stack.shift();
//                 break;

//             case '|':
//             case '&':
//                 catchString(i);
//                 catchString(i+1);
//                 break;
//             default: continue;
//         }
//     }

//     catchString(length);

//     return conditions;
// }

// function debug(...conditions) {
//     for(const cond of conditions)
//         console.debug(condition.check(cond), '\t', cond);
// }

// debug(
//     '(STR<2&MNY>3)|(MNY<2&CHR<2)',
//     '(STR<2&MNY>3)',
//     '(STR>2&MNY>3)',
//     '((((STR>2&MNY>2))))',
//     '((((STR>2&MNY>2)|(MNY<2&CHR<2))))',
//     '((((STR>2&MNY>2)|(MNY<2&CHR<2)&(STR>2&MNY>3))))',
//     '((((STR>2&MNY>2)|(MNY<2&CHR<2))&(STR>2&MNY>3)))',
//     'EVT![1,2,3]',
//     'EVT![1,2]',
//     'EVT?[1,2,3]',
//     'EVT?[1,2]',
// );

// const events = await axios('excel/events.json');
// const pools = await axios('excel/pools.json');
// async function debug() {

//     const events = JSON.parse(await readFile('data/events.json'));
//     const pools = JSON.parse(await readFile('data/age.json'));

//     const property = new Property();
//     const condition = new Condition();
//     const event = new Event();

//     property.initial({
//         CHR: 5,    // 颜值 charm CHR
//         INT: 5,    // 智力 intelligence INT
//         STR: 5,    // 体质 strength STR
//         MNY: 5,    // 家境 money MNY
//         SPR: 5,    // 快乐 spirit SPR
//         LIF: 5,    // 生命 life LIF
//         TLT: [5],    // 天赋 talent TLT
//         EVT: [5],    // 事件 event EVT
//     });
//     condition.initial({prop: property});
//     event.initial({events, pools, prop: property, condition});
//     console.debug(event.random());
// }

// debug();


// import {readFile} from 'fs/promises';
// import Property from './src/property.js';
// import Condition from './src/condition.js';
// import Event from './src/event.js';


import { readFile } from 'fs/promises';
import Life from './src/life.js'

global.json = filePath => readFile(filePath);

async function debug() {

    const life = new Life();
    await life.initial();

    life.restart({
        CHR: 5,    // 颜值 charm CHR
        INT: 5,    // 智力 intelligence INT
        STR: 5,    // 体质 strength STR
        MNY: 5,    // 家境 money MNY
        SPR: 5,    // 快乐 spirit SPR
        TLT: [1004, 1005, 1009],    // 天赋 talent TLT
    });
    const lifeTrajectory = [];
    let trajectory;
    do{
        try{
            trajectory = life.next();
        } catch(e) {
            console.error(e);
            // debugger
            throw e;
        }
        lifeTrajectory.push(lifeTrajectory);
        const { age, content } = trajectory;
        console.debug(`---------------------------------`);
        console.debug(`-- ${age} 岁`);
        console.debug('   ',
            content.map(
                ({type, description, rate, name, postEvent}) => {
                    switch(type) {
                        case 'TLT':
                            return `天赋【${name}】发动：${description}`;
                        case 'EVT':
                            return description + (postEvent?`\n    ${postEvent}`:'');
                    }
                }
            ).join('\n    ')
        );
    } while(!trajectory.isEnd)
    // debugger;
}

debug();