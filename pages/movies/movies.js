// pages/movies/movies.js
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesArr: [], //存储电影数据
    count: 10,//每页的条数
    start:0,//从哪个位置开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    wx.showLoading({ //提示窗口
      title:'拼命加载中',
      icon: 'loading'
    })
    this.getaMovies()
  },
  getaMovies(){ //发送请求获取电影信息
    const MOVIE_URL = `https://douban.uieee.com/v2/movie/top250?start=${this.data.start}&count=${this.data.count}`
    wx.request({
      url: MOVIE_URL,
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: (res) => {
        // console.log(res)
        //更新状态值
        this.setData({
          moviesArr: this.data.moviesArr.concat(res.data.subjects)
        })
        wx.hideLoading()
        appDatas.data.moviesArr = this.data.moviesArr
        
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉触底')
    this.setData({
      count: 10,//每页的条数
      start: this.data.start + 10,//从哪个位置开始
    })
    wx.showLoading({ //提示窗口
      title: '拼命加载中',
      icon: 'loading'
    })
    this.getaMovies()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})