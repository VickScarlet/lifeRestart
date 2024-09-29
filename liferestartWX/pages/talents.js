// miniprogram/pages/liferestart/talents.js
// 颜值 charm CHR
// 智力 intelligence INT
// 体质 strength STR
// 家境 money MNY
// 快乐 spirit SPR
// 生命 life LIF
// 天赋 talent TLT
// 事件 event EVT
import {
  $wuxToptips
} from '../utils/wux/index';
import {randomTalents,computeTalentsStatus, computeUseableProp, randomProp} from '../utils/liferestart/data/dataUtils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talentsArray: [],
    selectedTalentsID:[],
    selectedTalents:[],
    showSelectTalents: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // console.log('telents page onLoad')
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    this.clearStorage()
    this.loadTalents()
  },

  clearStorage: function() {
    this.setData({
      talentsArray: [],
      selectedTalentsID: [],
      selectedTalents: []
    })
    wx.removeStorageSync('selectedTalentsID')
    wx.removeStorageSync('selectedTalents')
    wx.removeStorageSync('propertyCHR')
    wx.removeStorageSync('propertyINT')
    wx.removeStorageSync('propertySTR')
    wx.removeStorageSync('propertyMNY')
    wx.removeStorageSync('currentRecord')
    wx.removeStorageSync('trajectory')
  },

  loadTalents: function() {
    const showTalents = randomTalents(10)
    // console.log('telents page loadTalents', showTalents)
    this.setData({
      talentsArray: showTalents
    })
  },

  onSelectTalents(e) {
    // console.log('onSelectTalents e',e)
    const selectedIndex = e.detail.selectedIndex
    const selectedValue = e.detail.selectedValue
    if (selectedValue.length > 3) {
      $wuxToptips().error({
        hidden: false,
        text: '只能选三个天赋',
        duration: 5000,
        success() {},
      })
      // e.detail.selectedValue.pop()
      e.detail.selectedIndex.pop()
    }// else {
    const tData = this.data

    tData.talentsArray.forEach((item) => {
      item.disabled = false
    });
    tData.selectedTalents = []
    // console.log('selectedIndex',selectedValue)
    if (selectedValue.length == 3) {
      tData.talentsArray.forEach(function(item, idx) {
        // console.log('item',item._id,(selectedValue.includes(item._id)))
        if (selectedValue.includes(item._id)) {
          item.disabled = false
        } else {
          // console.log('item2',idx,item.inputChecked)
          item.disabled = true
        }
      })
    }
    selectedIndex.forEach(function (item, idx) {
    // for (var i = 0; i < selectedIndex.length; i++) {
      const currentTalents = tData.talentsArray[item]
      // console.log('currentTalents=',idx,currentTalents)
      tData.selectedTalents.push(currentTalents)
      if ('exclusive' in currentTalents) {
        const currexc = currentTalents.exclusive
        // console.log('currexc',currexc.length)
        currexc.forEach(function (itemexc, idxexc) {
          // console.log('currexc',itemexc)
          tData.talentsArray.forEach(function(itemTal, idxTal) {
            if (itemTal._id == itemexc) {
              // console.log('itemTal',itemTal)
              itemTal.disabled = itemTal._id == itemexc
            }
          })
        })
      }
    })
    this.setData({
      talentsArray: tData.talentsArray,
      selectedTalentsID: e.detail.selectedValue,
      selectedTalents: tData.selectedTalents
    })
    wx.setStorage({
      key: 'selectedTalentsID',
      data: this.data.selectedTalentsID
    })
    wx.setStorage({
      key: 'selectedTalents',
      data: tData.selectedTalents
    })
    // console.log('checkbox发生change事件，携带value值为：', this.data.selectedTalents)
    // }
  },
  showTalents(e) {
    this.setData({
      showSelectTalents: true
    })
  },
  randomLife(e) {
    const selectedTalents = randomTalents(3)
    const selectedTalentsID = selectedTalents.map(function(item) {
      return item._id
    });
    const status = computeTalentsStatus(selectedTalents)
    // console.log('status', status)
    const proNum = computeUseableProp(20, status)
    const arr = randomProp(proNum, [10,10,10,10])
    console.log('selectedTalentsID', selectedTalentsID,  proNum, arr)
    wx.setStorage({
      key: 'selectedTalentsID',
      data: selectedTalentsID
    })
    wx.setStorage({
      key: 'selectedTalents',
      data: selectedTalents
    })
    wx.setStorage({
      key: 'propertyCHR',
      data: arr[0]
    })
    wx.setStorage({
      key: 'propertyINT',
      data: arr[1]
    })
    wx.setStorage({
      key: 'propertySTR',
      data: arr[2]
    })
    wx.setStorage({
      key: 'propertyMNY',
      data: arr[3]
    })
    wx.redirectTo({
      url: 'trajectory'
    })
  },

  toProperty(e) {
    if (this.data.selectedTalents.length < 3) {
      $wuxToptips().error({
        hidden: false,
        text: '请选择三个天赋',
        duration: 5000,
        success() {},
      })
    } else {
      wx.redirectTo({
        url: 'property'
      })
    }
  },
  onShareTimeline(e) {
    return {
      title: "人生重开模拟器",
      imageUrl: "../../../images/liferestart_cover.jpg",
    }
  },
  onShareAppMessage: function () {
    return {
      title: '人生重开模拟器',
      imageUrl: '../../../images/liferestart_cover.jpg',
      path: '/pages/index/index',
    }
  },

})