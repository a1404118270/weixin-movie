// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchMovies:[], //保存搜索结果
    start: 0,//开始搜索的位置
    count: 10,//每次请求的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  formSubmit(e) {
    console.log(e.detail.value.keyword) //获取input提交的内容
    if (!e.detail.value.keyword) {
      return wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none'
      })

    }
    //发送请求搜索电影
    this.searchMoie(e.detail.value.keyword)
  },
  searchMoie(keyword){

    wx.showLoading({
      title: '拼命加载中',
    })
    //请求的地址
    let movieUrl = `https://douban.uieee.com/v2/movie/search?q=${keyword}&start=${this.data.start}&count=${this.data.count}`
    // 发送请求
    wx.request({
      url: movieUrl,
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: (res) => {
        console.log(res)
        //更新状态值
        this.setData({
          searchMovies: res.data.subjects
        })
        wx.hideLoading()
        if (this.data.searchMovies.length ===0) {
          wx.showToast({
            title: '没有搜索结果',
            icon:'none'
          })
        }
      }
     
    })

  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})