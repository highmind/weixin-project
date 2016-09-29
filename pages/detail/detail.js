//detail.js
//电影详情

var app = getApp();

Page({
  data: {
    hidden: true,
    toView: 'red',
    scrollTop: 100,
    moviePhotos : [],
    actorInfo : [],
    movieInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
  tap: function(e) {
    
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
 // onShow: function(){
 //  this.setData({
 //      hidden: false
 //    });
 // },

 onReady: function(){

   // this.setData({
   //    hidden: true
   //  });

   wx.setNavigationBarTitle({
      title: '影片详情'
    })
  },

 // res为页面间传参对象
  onLoad: function (res) {
    console.log('onLoad.... detail')
   

    var that = this
    that.setData({  
        hidden: false
    })

    if(res != null){

      movieId = res.movieId;

      //调用远程接口数据
      wx.request({
        url: 'http://localhost/test/api/detail-my.php',
        data: {
           id: movieId,
           sleep : 1
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res);

          var movieData = res.data.data.MovieDetailModel;
          var dra = movieData.dra;
          var photos = movieData.photos;

          // console.log(photos)

          for(var i = 0; i < photos.length; i++){
            photos[i] = photos[i].replace('/w.h', "").replace('@100w_100h_1e_1c', "") + '@180w_140h_1e_1c';
          }

          actorArr = movieData.star.split(' ');
          actorArr.pop();
          console.log(actorArr);
          // cons=res.data.data.MovieDetailModel;e.log(photos);

          movieData.dra = dra.replace(/<[^>]+>/g,"");
 
          // console.log(imgsrc);
     
         that.setData({
             moviePhotos : photos,
             movieInfo : movieData,
             actorInfo : actorArr,
             hidden: true
          })

         
     
         
        }
      })


    }

   
    
   
   
  }
})
