//main.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎光临',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad.... main')
    var that = this
    //调用应用实例的方法获取全局数据
   
  }
})
