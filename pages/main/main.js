//main.js
//获取应用实例
var app = getApp()
Page({
  data: {
    defaultSize: 'mini',
    primarySize: 'mini',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    movieInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //查看详情,通过点击事件传参，参数绑定在 view上 使用 data-movieid形式
  showMoreInfo: function(e){

      var movieId = e.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '../detail/detail?movieId=' + movieId
      })
  },
 //加载更多
  addMoreInfo: function(){

  },

  onLoad: function () {
    console.log('onLoad.... main')
    var that = this
    //调用应用实例的方法获取全局数据
    //调用远程接口数据
    wx.request({
      url: 'http://101.201.115.46/code-test/api/movie-my-wx/movie-my.php',
      data: {
         offset: 0, //第2条开始
         limit: 10  //取10条
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data.movies)
        console.log(res.data.data.movies[1])
        that.setData({
           movieInfo : res.data.data.movies
        })
      }
    })
   
  }
})
