//index.js
//获取应用实例
var app = getApp()

Page({
  data: {

    primarySize: 'mini', //更多按钮样式
    hidden: true,       //loading 设置
    movieInfo: [],    //正在热映
    movieInfoCom :[], //即将上映
    offset: 0,        //数据开始页
    limit: 10,        //每次加载条数
    toTop: '',       //scorllView要滚动到的顶部id,默认为空
    scrollTop : 0,  //scrollview 滚动条默认位置
    toTopStatus : true //控制回到顶部 按钮显示和隐藏状态
  },

  //滑动到顶部触发
  scrollUpper:function(){
    console.log('to top');
    //滑动到顶部时，把返回按钮隐藏
    this.setData({
        toTopStatus : true
      });
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
   //滑动到底部时,请求 即将上映 的电影数据
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
           movieInfoCom : that.data.movieInfoCom.concat(res.data.data.movies), //当前页数据和下一页数据  数组合并，这样才能全部更新到view上
           hidden : true,
           offset : that.data.offset + that.data.limit
        })
      }

    })

  },
  //滑动中  设置 toTop为 空，用于返回顶部
  scroll:function(e){
     
     // console.log(e.detail.scrollTop)
     // console.log( typeof(this.data.toTop))

    //滚动高度超过一定范围 并且返回顶部按钮是隐藏的时候，显示 返回顶部按钮
    // console.log(this.data.toTop + 'sdfsdfsfd');
    if(e.detail.scrollTop >= 600 && this.data.toTopStatus ){
      this.setData({
        toTopStatus : false
      });
    }

    //防止重复设置toTop
     if(this.data.toTop == ''){
        return;
     }
     //滑动的时候，将返回顶部id 变为空
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
      toTopStatus : true, //隐藏返回顶部按钮
      toTop : 'top'       //设置scrollview 定位 id 为 top

    })
  },

   onShow: function(){
  //设置顶部部栏文字
    wx.setNavigationBarTitle({
      title: '芝麻电影'
    });
  },

   onReady: function(){
  //设置顶部部栏文字
    wx.setNavigationBarTitle({
      title: '芝麻电影'
    });
  },



  onLoad: function () {
    console.log('onLoad.... main')
    var that = this;
    //页面加载时，打开loading，隐藏返回顶部按钮
    this.setData({
      hidden:false,
      toTopStatus : true
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
