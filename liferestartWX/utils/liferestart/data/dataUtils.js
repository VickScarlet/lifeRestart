
import talentsData from './talents.js';
import ageData from './age.js';
import eventsData from './events.js';
import { max, sum } from '../functions/util.js';
import { summary } from "../functions/summary.js";
//"\d*": -> 
//"age": "(\d*)", -> "_id": "$1", "age": "$1",
//"\d*": \{ -> {
//"id": -> "_id":
function allTalents() {
//   wx.setStorage({
//   key: 'talentsData',
//   data: talentsData
// })
  return talentsData.slice(0)
}
function allAge() {
//   wx.setStorage({
//     key: 'agedata',
//     data: ageData
// })
  return ageData.slice(0)
}
function allEvents() {
//     wx.setStorage({
//     key: 'eventsData',
//     data: eventsData
// })
  return eventsData.slice(0)
}

function randomTalents(max) {
  const result = getRandomInRange(talentsData, max)
  return result
}
function getRandomInRange(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(min).sort(function(a,b){return a-b;});
}

function buildSummary(records, type) {
  const value = max(records.map(({[type]:v})=>v));
  const { judge, grade } = summary(type, value);
  return { judge, grade, value };
}

function finalSummary(records) {
  const m = type=>max(records.map(({[type]: value})=>value));
  const value = Math.floor(sum(m('CHR'), m('INT'), m('STR'), m('MNY'), m('SPR'))*2 + m('AGE')/2);
  const { judge, grade } = summary('SUM', value);
  return { judge, grade, value };
}

function computeTalentsStatus(talents) {
  var status = talents.map(function(item) {
    if ('status' in item) {
      return item.status
    } else {
      return 0
    }
  })
  return status
}

function computeUseableProp(max, status) {
  var proNum = max
  status.forEach(function(item){
    proNum = proNum + item
  })
  return proNum
}

function randomProp(max, init){
  // console.log('randomProperty', t)
  var arr = init
  while(max>0) {
    const sub = Math.round(Math.random() * (Math.min(max, 10) - 1)) + 1;
    while(true) {
      const select = Math.floor(Math.random() * 4) % 4;
      if(arr[select] - sub <0) continue;
      arr[select] -= sub;
      max -= sub;
      break;
    }
  }
  return arr
}

export { randomTalents, getRandomInRange, allTalents, allAge, allEvents, buildSummary, finalSummary, computeTalentsStatus, computeUseableProp, randomProp };