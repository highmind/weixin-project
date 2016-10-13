
//获取应用实例
var app = getApp()

Page({
  data: {
    cinemaDetailInfo : {},     //影院详细信息
    dates:[],                  // 日期
    movies:[],                 // 该影院上映的电影
    currentMovie:{},           //当前电影信息
    dateShow : {},             // 日期对应的电影详细信息， 播放厅等
    currentDate: '',           //进入日期用于 展示电影信息详情，如2016-10-07
    hidden: true,       //loading 设置
    scrollTop: 100
  },

  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },

  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
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

  onLoad: function (res) {
    console.log('onLoad.... main')
    var that = this;
    var cinemaId;

     if(res != null){
      //获取影院id
       cinemaId = res.cinemaId;
       console.log(cinemaId)
     }


    //页面加载时，打开loading
    this.setData({
      hidden:false
    })
    //调用应用实例的方法获取全局数据
    //调用远程接口数据,获取影院详情，包括上映的电影，
    wx.request({
      url: 'http://localhost/wx-project/api/cinema-detail.php',

      data: {
         sleep : 0, //接口返回数据延迟时间，用于测试loading
         cinemaid : cinemaId
      },

      header: {
          'Content-Type': 'application/json'
      },

      success: function(res) {
       
        console.log('通过影院id 得到的数据');
        console.log(res.data);

        //获取当前影院上映的电影的第一条的 id，用于查询 场次 票价等
        var movieId = '';
        //该影院有电影上映时
        if(res.data.data.movies.length != 0){
           movieId = res.data.data.movies[0].id;
           console.log(movieId);

            console.log('当前影院上映电影的第一条 id');
            console.log(movieId);
           
            //通过id获取 该电影在该影院的 相关信息 如场次和票价等
            wx.request({

               url: 'http://localhost/wx-project/api/cinema-detail.php',

               data: {
                 sleep : 0, //接口返回数据延迟时间，用于测试loading
                 cinemaid : cinemaId,
                 movieid  : movieId
               },

               header: {
                'Content-Type': 'application/json'
               },

               success : function(res){
                   console.log(res.data);
                   var dataInfo = res.data.data;
                   console.log("第一条场次信息")
                   console.log(dataInfo.DateShow[dataInfo.Dates[0].slug])

                   var firstData = dataInfo.DateShow[dataInfo.Dates[0].slug];// 日期对应的电影详细信息， 播放厅等
                   //将 sellPrStr 格式化，去除html代码，提取价格，45336， 取中间 33
                   for(var i = 0; i < firstData.length; i++){
                     firstData[i].sellPrStr = firstData[i].sellPrStr.replace(/<[^>]+>/g,"").substring(2,4);
                   }


                   that.setData({
                      cinemaDetailInfo : dataInfo.cinemaDetailModel,       //影院详细信息
                      currentMovie: dataInfo.currentMovie,                 //当前电影信息
                      dates:dataInfo.Dates,                                // 日期
                      movies:dataInfo.movies,                              // 该影院上映的电影
                      dateShow : firstData,                                // 日期对应的电影详细信息， 播放厅等
                      currentDate : dataInfo.Dates[0].slug,                //当前日期
                      hidden: true
                  })
               }

            });


        }
        else{
          // 这里做没有电影的提示
        }

       
        
        
       

      }

    })
   
  }
})
