var  _page;
var dirX = [-0.2, 0,0.2];
var dirY = [-0.2, 0,0.2];
Page({
  data: {
    showInfo:false,
    moveInfo:{
      moveTimer:null,
      directionTimer:null
    },
    swiperInfo:{
      indicatorDots: false,
      autoplay: false,
      interval: 2000,
      indicatordots: false,
      duration: 1000
    },
    contentList:[
      {
        imgUrl: '/images/1.jpg',
        idStr:"VOL.2281",
        title:"可爱之人必有可胖之处",
        imgAutor:"插画|赵延栟",
        day:'02',
        dateYM:'01/2019',
        content:'有时想到人生尽头，若孟婆汤也是塑料饮料瓶包装的那种，拧开瓶盖，“谢谢参与”和再来一瓶，真不知道哪个更可怕。',
        autor:'一一井道'
      },
      {
        imgUrl:'/images/2.jpg',
        idStr: "VOL.2284",
        title: "越是觉得自己在走直线",
        imgAutor: "插画|狐狸护理",
        day: '07',
        dateYM: '01/2019',
        content: '越是觉得自己在走直线，就越是容易偏离正轨，这跟人生是一回事。越是觉得自己走在笔直的康庄大道上，就越容易在不经意间失足。',
        autor: '一一伊坂幸太郎'
      }
    ],
    imageInfo:{
      imgUrl:'/images/1.jpg',
      width:800,
      height: 800,
      backgroudWidth: 1600,
      backgroudHeight: 1600,
      left:0,
      top: 0,
      backgroudLeft: 0,
      backgroudTop: 0,
      containerWidth:280,
      containerHeight: 370,
      backgroudContainerWidth: 600,
      backgroudContainerHeight: 750,
      limitX:0,
      limitY:0,
      initXY:()=>{
        var that=_page.data.imageInfo;
        that.limitX = that.width - that.containerWidth;
        that.limitY = that.height - that.containerHeight;
        that.top = (that.containerHeight - that.height) / 2;
        that.left = (that.containerWidth - that.width) / 2;

        that.backgroudLeft=(that.backgroudContainerWidth-that.backgroudWidth)/2;
        that.backgroudTop = (that.backgroudContainerHeight - that.backgroudHeight) / 2;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    _page = this;
    _page.data.imageInfo.initXY();
    _page.changeImageDirction();
  },

  changeImageDirction: (_x,_y) => {
    if(_page.data.moveInfo.moveTimer){
      clearInterval(_page.data.moveInfo.moveTimer);
      _page.data.moveInfo.moveTimer=null;
    }
    var x = 0, y = 0;
    if (typeof _x == 'number' && typeof _y=='number'){
      x=-_x;
      y=-_y;
    }else{
      x = dirX[Math.round(Math.random() * 2)];
      y = dirY[Math.round(Math.random() * 2)];
      if(x==0 && y==0)
        x=-dirX[0];
    }
    console.log({
      x:x,
      y:y
    });
    _page._imageMove(x, y);

    if(!_page.data.moveInfo.directionTimer){
      _page.data.moveInfo.directionTimer = setInterval(function () {
        _page.changeImageDirction();
      }, 5000);    
    }
  },
  _imageMove: (_x,_y) => {
    _page.data.imageInfo.left+=_x;
    _page.data.imageInfo.top += _y;
    _page.data.imageInfo.backgroudLeft += _x;
    _page.data.imageInfo.backgroudTop += _y;

    //如果到边界了，反向移动
    if (_page.data.imageInfo.left > 0 || _page.data.imageInfo.top > 0 
      || Math.abs(_page.data.imageInfo.top) > _page.data.imageInfo.limitY
      || Math.abs(_page.data.imageInfo.left) > _page.data.imageInfo.limitX
    ){
      console.log('limit!!!!');
      _page.changeImageDirction(_x,_y);
      return;
    }
    //实现移动
    _page.setData({
      imgStyles: {
        left: _page.data.imageInfo.left,
        top: _page.data.imageInfo.top,
        backgroudLeft: _page.data.imageInfo.backgroudLeft,
        backgroudTop: _page.data.imageInfo.backgroudTop,
      }
    });
    if(!_page.data.moveInfo.moveTimer){
      _page.data.moveInfo.moveTimer=setInterval(function () {
        _page._imageMove(_x, _y);
      }, 10);
    }
  },
  showInfoDetail:()=>{
    _page.animation = wx.createAnimation();
    _page.animation.height(250).step()
    _page.setData({ animation: _page.animation.export(),showInfo:true })
  },
  showInfo:()=>{
    _page.setData({
      showInfo: false
    });
  }
})