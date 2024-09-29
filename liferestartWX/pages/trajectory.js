// miniprogram/pages/liferestart/trajectory.js
import Life from "../utils/liferestart/life";
import Property from "../utils/liferestart/property";
import {allAge} from "../utils/liferestart/data/dataUtils.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    propertyCHR : 0,
    propertyINT : 0,
    propertySTR : 0,
    propertyMNY : 0,
    selectedTalentsID : [],
    isEnd : false,
    items : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initialData()
  },

  initialData() {
    const tData = this.data
    const _this = this
    const propertyCHR = wx.getStorageSync('propertyCHR')
    const propertyINT = wx.getStorageSync('propertyINT')
    const propertySTR = wx.getStorageSync('propertySTR')
    const propertyMNY = wx.getStorageSync('propertyMNY')
    const selectedTalentsID = wx.getStorageSync('selectedTalentsID')

    this.property = new Property(this);
    this.life = new Life(this)
    this.life.initial()

    this.life.restart({
      CHR: propertyCHR,
      INT: propertyINT,
      STR: propertySTR,
      MNY: propertyMNY,
      SPR: 5,
      TLT: selectedTalentsID,
    });
    var trajectory = this.life.next()

    wx.setStorage({
        key: 'currentRecord',
        data: this.life.getRecord()
    })
    const { age, content, isEnd } = trajectory
    tData.items.push(trajectory)
    const newprop = this.life.getLastRecord()
    _this.setData({
      items : tData.items,
      selectedTalentsID : selectedTalentsID,
      propertyCHR : newprop.CHR,
      propertyINT : newprop.INT,
      propertySTR : newprop.STR,
      propertyMNY : newprop.MNY,       
      scrollTopVal: 0,
      isEnd: isEnd,
      pageHeight: wx.getSystemInfoSync().windowHeight - (isEnd?200:150),
    })

    

  },
  nextAge(e) {
    const tData = this.data
    // console.log('trajectorypage nextAge')
    if (!tData.isEnd) {
      const _this = this
      var trajectory = this.life.next()
      const { age, content, isEnd } = trajectory
      tData.items.push(trajectory)
      const newprop = this.life.getLastRecord()
      _this.setData({
        items : tData.items,
        propertyCHR : newprop.CHR,
        propertyINT : newprop.INT,
        propertySTR : newprop.STR,
        propertyMNY : newprop.MNY,
        scrollTopVal: tData.items.length * 999,
        isEnd: isEnd,
        pageHeight: wx.getSystemInfoSync().windowHeight - (isEnd?200:150),
      })
    }
  },
  toSummary(e) {
    wx.setStorage({
        key: 'currentRecord',
        data: this.life.getRecord()
    })
    wx.setStorage({
      key: 'trajectory',
      data: this.data.items
    })
    wx.redirectTo({
      url: 'summary'
    })
  },
})