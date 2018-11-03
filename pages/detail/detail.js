// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datailObj: {},
    id: null,
    isCollected: false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { //options中包含 url中传递的参数
    //  获取参数值
    let {id} = options

    // 请求电影详情数据
    this.getmovie(id)
    this.setData({
      id
    })
    // 根据本地缓存的数据判断用户是否收藏当前的文章
    let detailStorage = wx.getStorageSync('isCollected')
    //  如果没有缓存设置一个空对象
    if (!detailStorage) {
      wx.setStorageSync('isCollected', {})
    }
    // 判断用户是否收藏
    if (detailStorage[id]){
     this.setData({
       isCollected: true
     })
    }
  },
  handleCollection() { //实现用户点击收藏
    let isCollected = !this.data.isCollected
    // 更新用户状态
    this.setData({
      isCollected
    })
    // 提示用户
    let title = this.data.isCollected ? '收藏成功' : '取消收藏'
    wx.showToast({ //提示窗口
      title,
      icon: 'success'
    })
    // 缓存数据到本地
    let id = this.data.id
    ///每次新建对象会覆盖原来的状态 
    // let obj = {} 
     wx.getStorage({ //获取Storage中的对象
      key: 'isCollected',
      success: datas =>{
        let obj = datas.data
        obj[id] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {

          }
        })
      },
    })
   
  },
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享到QQ空间','分享到微博'
      ],
    })
  },
  getmovie(id){
    
    wx.showLoading({
      title: '拼命加载中',
    })
    //请求的地址
    let movieUrl = `https://douban.uieee.com/v2/movie/subject/${id}`
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
          datailObj: res.data
        })
        wx.hideLoading()

      }
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