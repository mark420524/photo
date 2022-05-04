// app.js
import util from 'utils/util.js'
import api from 'api/api.js'
import CONSTANT from 'utils/constant';
let appId = wx.getAccountInfoSync().miniProgram.appId;
App({
  onLaunch() {
    // 登录
   
    wx.cloud.init({
      //set your cloud  env 
      env: 'cloud1-7go9kh8q711e6fc2'
    })
    let uid = util.getUserId();
    if (uid) {
        
    }else{
        this.initUserId();
    }
    
  },
  globalData: {
    userInfo: null
  },
  initUserId(){
    //console.log('准备登录')
    wx.showLoading({
    'title': '正在初始化，请稍候...',
    'mask': true
    });
    wx.cloud.callFunction({
			name: 'adduser',
			success: res=>{
          wx.setStorageSync('uid', 1)
      },
			fail:err=> {
				 
      },
      complete: () => {
        wx.hideLoading( )
      }
		})
  },
  utils: util,
  apis: api,
  CONSTANT:CONSTANT,
  appId:appId
})
