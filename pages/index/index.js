//index.js
//获取应用实例
var app = getApp()

Page({
  data: {

    primarySize: 'mini', //更多按钮样式
    hidden: true,       //loading 设置
    movieInfo: [],    //正在热映
    movieInfoCom :[], //即将上映
    scrollTop: 100, //用于滚动
    offset: 0,
    limit: 10,
    toTop: '',
    scrollTop : 0  //scrollview 滚动条默认位置
  },

  //滑动到顶部触发
  scrollUpper:function(){
    console.log('to top');
    // this.onLoad();
  },
  //scrollview 滑动到底部时触发
  scrollLower:function(){
    console.log('to bottom');
    var that = this;
    //打开loading
    this.setData({
      hidden:false
    })
    console.log(that.data.offset + that.data.limit)
    wx.request({
      url: 'http://localhost/wx-project/api/movie-my.php',

      data: {
         type : 'coming',
         offset : that.data.offset + that.data.limit, //开始
         limit : that.data.limit,  //取的条数
         sleep : 1 //接口返回数据延迟时间，用于测试loading
      },

      header: {
          'Content-Type': 'application/json'
      },

      success: function(res) {
        console.log(res.data.data.movies)
        that.setData({
           movieInfoCom : that.data.movieInfoCom.concat(res.data.data.movies),
           hidden: true,
           offset:that.data.offset + that.data.limit
        })
      }

    })

  },
  //滑动中  设置 toTop为 空，用于返回顶部
  scroll:function(){
    console.log('scrolling')
     this.setData({
      toTop : ''
    })
  },
  //查看详情,通过点击事件传参，参数绑定在 view上 使用 data-movieid形式
  showMoreInfo: function(e){
      var movieId = e.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '../detail/detail?movieId=' + movieId
      })
  },
  //返回顶部
  goTop : function(){
    this.setData({
      toTop : 'top'
    })
  },

  onLoad: function () {
    console.log('onLoad.... main')
    var that = this
    this.setData({
      hidden:false
    })
    //调用应用实例的方法获取全局数据
    //调用远程接口数据
    wx.request({
      url: 'http://localhost/wx-project/api/movie-my.php',

      data: {
         type : 'hot',
         offset: 0, //开始
         limit: 20,  //取10条
         sleep : 0 //接口返回数据延迟时间，用于测试loading
      },

      header: {
          'Content-Type': 'application/json'
      },

      success: function(res) {
        console.log(res.data.data.movies)
        that.setData({
           movieInfo : res.data.data.movies,
           hidden: true
        })
      }

    })
   
  }
})
