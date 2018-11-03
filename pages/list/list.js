Page({

  /**
   * 页面的初始数据
   */
  data: {
    newMovies: [], //存储最新电影的数组
    start: 0, //从哪个位置开始
    count: 12, // 每一页数据的长度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    // 发送请求获取最新电影数据
    this.getNewMovies()

  },
  getNewMovies() {
    wx.showLoading({
      title: '拼命加载中',
    })
    //请求的地址
    let movieUrl = `https://douban.uieee.com/v2/movie/in_theaters?start=${this.data.start}&count=${this.data.count}`
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
          newMovies: this.data.newMovies.concat(res.data.subjects)
        })
        wx.hideLoading()

      }
    })
  },
  //点击跳转到 detall详情页
  toDetail(event) {
    // 获取点击跳转对应电影id
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id
    })
    // console.log(id)
  },
  nextMovie() { //获取更多的电影数据
  if(this.data.start <= 12){
    this.setData({ //更新起始位置
      start: this.data.start + 12
    })

    this.getNewMovies()
  } else{
    wx.showToast({
      title: '暂无更多',
      icon:'none'
    })
  }
   
  },
  tosearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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