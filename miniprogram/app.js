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
        
    }else{
        this.initUserId();
    }
    
  },
  globalData: {
    userInfo: null
  },
  initUserId(){
     
		 
  },
  utils: util,
  apis: api,
  CONSTANT:CONSTANT,
  appId:appId
})
