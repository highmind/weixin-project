
//获取应用实例
var app = getApp()

Page({
  data: {
    cinemaInfo : [],
    hidden: true,       //loading 设置
    subhidden : true   //子菜单隐藏
  },


  //查看详情,通过点击事件传参，参数绑定在 view上 使用 data-movieid形式
  showMoreInfo: function(e){
      var cinemaId = e.currentTarget.dataset.cinemaid;
      console.log(cinemaId);
      // wx.navigateTo({
      //   url: '../detail/detail?movieId=' + movieId
      // })
  },

  //区点击操作，收起或者展开 影院信息
  cinemaToggle: function(e){
    var id = e.currentTarget.id;
    console.log('点击获取的id');
    console.log(id);
    var cinemaData = this.data.cinemaInfo;
    console.log(cinemaData[1].id);
        for (var i = 0; i < cinemaData.length; i++) {
            if (cinemaData[i].id == id) {
                cinemaData[i].open = !cinemaData[i].open;
            } else {
                cinemaData[i].open = false;
            }
        }

    this.setData({
        cinemaInfo : cinemaData

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
    //页面加载时，打开loading
    this.setData({
      hidden:false,
      subhidden : true
    })
    //调用应用实例的方法获取全局数据
    //调用远程接口数据
    wx.request({
      url: 'http://localhost/wx-project/api/cinema-my.php',

      data: {
         sleep : 0 //接口返回数据延迟时间，用于测试loading
      },

      header: {
          'Content-Type': 'application/json'
      },

      success: function(res) {
        // 进行数据格式转换
        // 转换成Object, Object, Object, Object, Object]
        // 0:Object
        // data:Array[5]
        // item:"海港区"

        var cinemaData = [];
        var i = 0; 

        for(var item in res.data.data){
          var json = {'item' : item, 'data' : res.data.data[item], 'id' : 'cinema' + i, 'open':false };
          i++;
          cinemaData.push(json);
        }

        cinemaData[0].open = true;

        console.log('格式化以后的数据');
        console.log(cinemaData);

        that.setData({
           cinemaInfo : cinemaData,
           hidden: true,

        })

      }

    })
   
  }
})
