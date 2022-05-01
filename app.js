// app.js
import util from 'utils/util.js'
import api from 'api/api.js'
import CONSTANT from 'utils/constant';
let appId = wx.getAccountInfoSync().miniProgram.appId;
App({
  onLaunch() {
    // 登录
    let uid = util.getUserId();
    if (uid) {
        console.log('用户已登录，要不要读取用户头像呢');
    }else{
        this.initUserId();
    }
    wx.cloud.init({
      //set your cloud  env 
      env: 'cloud1-7go9kh8q711e6fc2	'
    })
    
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
    wx.login({
        success (res) {
            //console.log(res)
            let data={ 
              code:res.code,
              appId:appId
            }
            if(res.code){
                api.userLogin(data).then(res=>{
                  wx.hideLoading();
                  wx.setStorageSync('uid', res.userId)
                  wx.setStorageSync('userToken', res.token)
                });
            }
        },
        fail(res) {
          wx.hideLoading();
          //console.log(res)
        }
    });
  },
  utils: util,
  apis: api,
  CONSTANT:CONSTANT,
  appId:appId
})
