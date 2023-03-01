const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/static/images/avatar.png',
    nickName:'',
    fileTempPath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initInfo(){
    let userInfo = wx.getStorageSync('userInfo');
    //console.log(userInfo)
    if (userInfo) {
      this.setData({
        avatarUrl:userInfo.avatarUrl,
        nickName:userInfo.nickName
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initInfo();
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(avatarUrl)
    this.setData({
      fileTempPath:avatarUrl,
      avatarUrl:avatarUrl,
    })
  },
  onChangeNickname(e){
   
    this.setData({
      nickName:e.detail
    })
  },
  onBlurNickname(e) {
    
    this.setData({
      nickName:e.detail.value
    })
  },
  submitUserInfo(){
    let userInfo = wx.getStorageSync('userInfo') || {};
    let filePath=this.data.fileTempPath;
    let  nickName=this.data.nickName;
     
    userInfo.avatarUrl=filePath || userInfo.avatarUrl;
    userInfo.nickName = nickName || userInfo.nickName;
    wx.setStorageSync('userInfo', userInfo) 
    wx.navigateBack({
      delta: 1,
    }) 
  }
})