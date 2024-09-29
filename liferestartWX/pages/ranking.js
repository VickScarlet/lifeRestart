// miniprogram/page/liferestart/pages/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingAGE: [],//最长寿
    rankingSPR: [],//最快乐
    rankingMNY: [],//最有钱
    rankingSTR: [],//最健康
    rankingINT: [],//最聪明
    rankingCHR: [],//最漂亮
    rankingSCO: [],//最NB
  },

  loadRanking() {
    console.log('loadRanking')
    wx.cloud.callFunction({
      name: 'ranking',
      data: {
        handle: 'getRankingAll'
      }
    }).then(res => {
      console.log('ranking page ', res.result)
      this.setData({
        rankingAGE: res.result.recordAGE.data,//最长寿
        rankingSPR: res.result.recordSPR.data,//最快乐
        rankingMNY: res.result.recordMNY.data,//最有钱
        rankingSTR: res.result.recordSTR.data,//最健康
        rankingINT: res.result.recordINT.data,//最聪明
        rankingCHR: res.result.recordCHR.data,//最漂亮
        rankingSCO: res.result.recordFinal.data,//最NB
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadRanking()
  },

})