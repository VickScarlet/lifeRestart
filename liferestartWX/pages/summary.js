// miniprogram/pages/liferestart/summary.js
import {buildSummary,finalSummary} from "../utils/liferestart/data/dataUtils.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summaryCHR : {},
    summaryINT : {},
    summarySTR : {},
    summaryMNY : {},
    summaryFinal:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    this.initData()
  },

  initData() {
    var nickName = "神秘人"
    var avatarUrl = ""
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        nickName = userInfo.nickName
        avatarUrl = userInfo.avatarUrl
      }
    })
    const record = wx.getStorageSync('currentRecord')
    const recordCHR = buildSummary(record, 'CHR')
    const recordINT = buildSummary(record, 'INT');
    const recordSTR = buildSummary(record, 'STR');
    const recordMNY = buildSummary(record, 'MNY');
    const recordSPR = buildSummary(record, 'SPR');
    const recordAGE = buildSummary(record, 'AGE');
    const recordFinal = finalSummary(record)

    this.setData({
      summaryCHR : recordCHR,
      summaryINT : recordINT,
      summarySTR : recordSTR,
      summaryMNY : recordMNY,
      summarySPR : recordSPR,
      summaryAGE : recordAGE,
      summaryFinal : recordFinal
    })
    console.log('initData',this.data.summaryFinal)
  },
  again(e) {
    wx.redirectTo({
      url: 'index'
    })
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