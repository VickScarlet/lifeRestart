// miniprogram/pages/liferestart/property.js
import {
  $wuxToptips
} from '../utils/wux/index';
import {computeTalentsStatus, computeUseableProp, randomProp} from '../utils/liferestart/data/dataUtils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    propertyResidue : 0,
    propertyCHR : 0,
    propertyINT : 0,
    propertySTR : 0,
    propertyMNY : 0,
    propertyCHRMAX : 10,
    propertyINTMAX : 10,
    propertySTRMAX : 10,
    propertyMNYMAX : 10,
    propertyMaxInit : 0,
    selectedTalentsID : [],
    selectedTalents : []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    this.computeProperty()
  },

  randomProperty(e) {
    const arr = randomProp(this.data.propertyMaxInit, [10,10,10,10])
    // console.log('randomProperty', t, arr)
    this.setData({
      propertyCHR : 10 - arr[0],
      propertyINT : 10 - arr[1],
      propertySTR : 10 - arr[2],
      propertyMNY : 10 - arr[3],
      propertyCHRMAX : 10 - arr[0],
      propertyINTMAX : 10 - arr[1],
      propertySTRMAX : 10 - arr[2],
      propertyMNYMAX : 10 - arr[3],
      propertyResidue : 0

    })
  },

  bron(e) {
    const tData = this.data
    if (tData.propertyResidue > 0) {
      $wuxToptips().error({
        hidden: false,
        text: '你还有'+tData.propertyResidue+'属性点没有分配完',
        duration: 5000,
        success() {},
      })
      return
    }

    wx.setStorage({
      key: 'propertyCHR',
      data: tData.propertyCHR
    })
    wx.setStorage({
      key: 'propertyINT',
      data: tData.propertyINT
    })
    wx.setStorage({
      key: 'propertySTR',
      data: tData.propertySTR
    })
    wx.setStorage({
      key: 'propertyMNY',
      data: tData.propertyMNY
    })
    
    wx.redirectTo({
      url: 'trajectory'
    })
  },

  onChange(e) {
    const id = e.currentTarget.id
    const value = e.detail.value
    const tdata = this.data
    switch (id) {
      case 'propertyCHR':
        this.setData({
          propertyCHR : value
        })
        break
      case 'propertyINT':
        this.setData({
          propertyINT : value
        })
        break
      case 'propertySTR':
        this.setData({
          propertySTR : value
        })
        break
      case 'propertyMNY':
        this.setData({
          propertyMNY : value
        })
        break
    }
    // console.log(tdata.propertyCHR
    //   , tdata.propertyINT
    //   , tdata.propertySTR
    //   , tdata.propertyMNY)
    var max = tdata.propertyMaxInit 
      - tdata.propertyCHR 
      - tdata.propertyINT 
      - tdata.propertySTR 
      - tdata.propertyMNY
    max = max < 0 ? 0 : max
    // console.log(id, value, max)
    this.setData({
      propertyResidue : max < 0 ? 0 : max,
      propertyCHRMAX : max + tdata.propertyCHR >= 10? 10 : max + tdata.propertyCHR,
      propertyINTMAX : max + tdata.propertyINT >= 10? 10 : max + tdata.propertyINT,
      propertySTRMAX : max + tdata.propertySTR >= 10? 10 : max + tdata.propertySTR,
      propertyMNYMAX : max + tdata.propertyMNY >= 10? 10 : max + tdata.propertyMNY,
    })
    // console.log(tdata.propertyCHRMAX,tdata.propertyINTMAX,tdata.propertySTRMAX,tdata.propertyMNYMAX)
  },

  computeProperty: function() {
    const selectedTalents = wx.getStorageSync('selectedTalents')
    const selectedTalentsID = wx.getStorageSync('selectedTalentsID')
    console.log('selectedTalents', selectedTalents)
    var status =  computeTalentsStatus(selectedTalents)
    // console.log('status', status)
    var proNum = computeUseableProp(20, status)
    this.setData({
      propertyResidue: proNum,
      propertyMaxInit: proNum,
      selectedTalents: selectedTalents,
      selectedTalentsID: selectedTalentsID
    })
    // console.log('proNum', proNum)
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
  // change(prop, value) {
  //   if(Array.isArray(value)) {
  //     for(const v of value)
  //       this.change(prop, Number(v));
  //     return;
  //   }
  // }
})