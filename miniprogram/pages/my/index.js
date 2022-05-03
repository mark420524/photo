const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        userInfo:{}
    }, 
        // 去登陆
        toLogin(){
            let _this = this
            wx.getUserProfile({
                    desc: '获取你的昵称、头像、地区及性别',
                    success: res => {
                        let userInfo = res.userInfo;
                        _this.setData({
                            userInfo: userInfo
                        })
                        wx.setStorageSync("userInfo",userInfo)
                        
                        
                    },
                    fail: res => {
                        //拒绝授权
                        wx.showToast({
                            title: '您拒绝了请求,不能使用答题排名等功能',
                            icon: 'error',
                            duration: 2000
                        });
                        return;
                    }
                }); 
        },
        onLoad(){
            
        },
        aboutMe(){
            wx.navigateTo({
                url: '/pages/about/index',
              })
        },
     
        // 清除缓存
        clearCache(){
            this.setData({ userInfo:{} })
            wx.removeStorageSync("userInfo" );
            wx.showToast({
                title: '清除成功',
                icon:'none',
                duration: 2000
            })
        },
        
        // 帮助
        help(){
            wx.navigateTo({
                url: '/pages/help/index'
              })
        },
        otherTool(){
            wx.navigateTo({
                url: '/pages/other/index'
            })
        },
        getUserId(){
            let uid = wx.getStorageSync('uid');
            return uid;
        },
        onShow(){ 
            let userInfo = wx.getStorageSync('userInfo');
            this.setData({userInfo:userInfo})
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                  active: 1,
                })
              }
        }
})