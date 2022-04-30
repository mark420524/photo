const app = getApp();
const utils = app.utils;
const apis = app.apis;
Page({
    data:{
        size:{},
        color:'',
    },
    onLoad(){
        let size = wx.getStorageSync('photoSize');
        let color =  size.color||'';
        this.setData({size:size,color:color})
    },
    unloadInfo(){
        wx.removeStorageSync('photoSize')
    },
    onUnload(){
        this.unloadInfo();
    },
    onChangeColor(event) {
        this.setData({
          color: event.detail,
        });
    },
    chooseImage(e) {
      wx.showLoading({
        title: '处理中',
      })
      let that = this;
      let sourceType = e.currentTarget.dataset.sourceType;
      if (sourceType==='camera') {
        //校验是否授权
        wx.getSetting({
          success:function(res) {
            if (res.authSetting['scope.camera']) {
              //已经授权打开摄像头
              that.goToCamera();
            }else{
              //去授权页面
              wx.authorize({
                scope: 'scope.camera',
                success () {
                  that.goToCamera();
                },
                fail(){
                  that.openAuthCamera()	
                }
              })
            }
          },
          complete:function(res){
            wx.hideLoading( )
          }
        });
      }else {
        wx.hideLoading( )
        wx.chooseMedia({
          count: 1,
          sizeType: ['original', 'compressed'],
          mediaType: ['image'],
          sourceType: [sourceType],
          success(res) {
              console.log(res)
              let file_path = res.tempFiles[0].tempFilePath;
              console.log(file_path)
            if (file_path === null || file_path === undefined) {
              utils.showWxToast(  '选择文件异常…' )
              return
            }
            
            wx.showLoading({ title: '上传中,请稍等…' })
            let data= {
              filePath:file_path,
              color: that.data.color||'',
              width: that.data.size.pxWidth||'',
              height:that.data.size.pxHeight||''
            }
            console.log(data)
            apis.imageUpload(data).then(res=>{
              wx.hideLoading();
              console.log(res)
              if(res){
                wx.setStorageSync('previewImage', res)
                wx.navigateTo({
                  url: '/pages/preview/index',
                })
              }else{
                utils.showWxToast('上传异常，请稍候重试')
              }
              
            })
          },
        })
      }
      
       
    },
    openAuthCamera(){
      wx.showModal({
        content: '检测到您没打开访问摄像头权限，是否打开？',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
        
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
          success: (res) => { }
          })
        } else {
          console.log('用户点击取消')
        }
        }
      });
    },
    goToCamera(){
      console.log('goto camera')
    }
     
})