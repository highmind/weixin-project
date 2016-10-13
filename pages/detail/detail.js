//detail.js
//电影详情

var app = getApp();

Page({
  data: {
    title: '影片详情',
    mOpen: false,
    hidden: true,
    toView: 'red',
    moviePhotos : [],
    actorInfo : [],
    comments : [],
    movieInfo: {}
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

//电影文字信息 更多按钮
 moreMovieInfo:function(){
   this.data.mOpen = !(this.data.mOpen);
 
   this.setData({
      mOpen:this.data.mOpen
   });
 },

 onReady: function(){
  //设置顶部栏文字
    wx.setNavigationBarTitle({
      title: this.data.title
    });
    //设置箭头按钮 打开方向
    this.setData({
        mOpen:false
    })
  },

 // res为页面间传参对象
  onLoad: function (res) {
    console.log('onLoad.... detail')
   console.log(res)
    var that = this;
    var movieId;
    //设置loading状态
    that.setData({  
        hidden: false
    })

    if(res != null){
      //获取电影id
      movieId = res.movieId;

      //调用远程接口数据
      // wx.request({
      //   url: 'http://localhost/wx-project/api/detail-my.php',
      //   //传给接口的数据
      //   data: {
      //      id: movieId,
      //      sleep : 1
      //   },

      //   header: {
      //       'Content-Type': 'application/json'
      //   },

      //   success: function(res) {
      //     console.log(res);
      //     var movieData = res.data.data.MovieDetailModel;
      //     var dra = movieData.dra;
      //     var photos = movieData.photos;

      //     // console.log(photos)
      //     //处理 电影剧照字符串，正常输出不能使用，需要 去的 /w.h
      //     for(var i = 0; i < photos.length; i++){
      //       photos[i] = photos[i].replace('/w.h', "").replace('@100w_100h_1e_1c', "") + '@180w_140h_1e_1c';
      //     }
      //     //将演员字符串 转换成数据，并且去除数组最后一个空格
      //     actorArr = movieData.star.split(' ');
      //     actorArr.pop();
      //     // console.log(actorArr);
      //     // cons=res.data.data.MovieDetailModel;e.log(photos);
      //     //去除 电影简介中的 p标签
      //     movieData.dra = dra.replace(/<[^>]+>/g,"");
 
      //     // console.log(imgsrc);
     
      //    that.setData({
      //        moviePhotos : photos,
      //        movieInfo : movieData,
      //        actorInfo : actorArr,
      //        hidden: true
      //     })

         
      //   }
      // })


        // 使用有演员信息的接口
       //调用远程接口数据
      wx.request({
        url: 'http://localhost/wx-project/api/detail-info.php',
        //传给接口的数据
        data: {
           id: movieId,
           sleep : 0
        },

        header: {
            'Content-Type': 'application/json'
        },

        success: function(res) {
          console.log(res);

         
        var movieData = res.data;
        that.setData({
          title : movieData.movie.nm
        });

        wx.setNavigationBarTitle({
          title: movieData.movie.nm
        });
       
         var photos = movieData.movie.photos;
         var actorArr = movieData.celebrities;

         // 电影封面
         var coverImg = movieData.movie.img;
         movieData.movie.img = coverImg.replace('/w.h', "").replace('@100w_100h_1e_1c', "") + '@177w_249h.webp';
       
   

         //处理 电影剧照字符串，正常输出不能使用，需要 去的 /w.h
          for(var i = 0; i < photos.length; i++){
            photos[i] = photos[i].replace('/w.h', "").replace('@100w_100h_1e_1c', "") + '@180w_140h_1e_1c';
          }

          //处理演员剧照
          
           for(var i = 0; i < actorArr.length; i++){
            actorArr[i].avatar = actorArr[i].avatar.replace('/w.h', "").replace('@100w_100h_1e_1c', "") + '@130w_180h_1e_1c';
          }
       
       var commentData = movieData.comments.hcmts;
       if(movieData.comments.hcmts.length == 0){
          commentData = movieData.comments.cmts;
       }
     
    
        console.log('格式化以后的数据');
        console.log(res);
     
         that.setData({
             moviePhotos : photos,
             movieInfo : movieData,
             actorInfo : actorArr,
             comments  : commentData,
             hidden: true
          })

         
        }
      })


    }

   
    
   
   
  }
})
