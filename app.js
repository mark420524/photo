// app.js
import util from 'utils/util.js'
import api from 'api/api.js'
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  utils: util,
  apis: api
})
