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
        this.setData({size:size,color:size.color})
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
      
      let sourceType = e.currentTarget.dataset.sourceType;
      let that = this;
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
              color: that.data.color,
              width: that.data.size.pxWidth,
              height:that.data.size.pxHeight
            }
            console.log(data)
            apis.imageUpload(data).then(res=>{
              wx.hideLoading();
              console.log(res)
            })
          },
        })
      },
    
     
})