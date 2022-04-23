const app = getApp();
const utils = app.utils;
Page({
    data:{
        size:{}
    },
    onLoad(){
        let size = wx.getStorageSync('photoSize');
        this.setData({size:size})
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
    chooseImage() {
        wx.chooseMedia({
          count: 1,
          sizeType: ['original', 'compressed'],
          mediaType: ['image'],
          sourceType: ['album'],
          success(res) {
              console.log(res)
              let file_path = res.tempFiles[0].tempFilePath;
              console.log(file_path)
            if (file_path === null || file_path === undefined) {
              utils.showWxToast(  '选择文件异常…' )
              return
            }
            /*
            wx.showLoading({ title: '上传中,请稍等…' })
            wx.uploadFile({
              url: `${API_ROOT}/api/photo/make`,
              filePath: file_path,
              name: 'file',
              header: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth_token}`,
              },
              formData: {
                
              },
              success: (result) => {
                
                wx.hideLoading()
                
              },
              fail: (e) => {
                utils.showWxToast('上传失败…' )
              },
              complete: (e) => {
                wx.hideLoading()
              },
             
            })
             */
          },
        })
      },
    
      takeImageFromCamera() {
        
        wx.chooseMedia({
          count: 1,
          sizeType: ['original', 'compressed'],
          mediaType: ['image'],
          sourceType: ['camera'],
          success(res) {
            let file_path = res.tempFiles[0].tempFilePath;
            console.log(file_path)
            if (file_path === null || file_path === undefined) {
              wx.showToast({ title: '上传文件异常…', icon: 'none', duration: 2000 })
              return
            }
            /*
            wx.showLoading({ title: '上传中,请稍等…' })
            wx.uploadFile({
              url: `${API_ROOT}/api/photo/make`,
              filePath: file_path,
              name: 'file',
              header: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${auth_token}`,
              },
              formData: {
                spec_id: spec_id
              },
              success: (result) => {
                app.globalData.tempFilePaths = file_path
                wx.hideLoading()
                let make_res = typeof result.data === 'string' ? JSON.parse(result.data) : result.data
                if(make_res.code !== 0) {
                  wx.showToast({ title: '图片规格不符合', icon: 'none', duration: 2000 })
                } else {
                  wx.navigateTo({
                    url: '/pages/photo/preview',
                    success: function(res) {
                      res.eventChannel.emit('acceptDataFromPhotoDetailPage', {data: make_res.data})
                    }
                  })
                }
              },
              fail: (e) => {
                utils.showWxToast('上传失败…' )
              },
              complete: (e) => {
                wx.hideLoading()
              },
            })
            */
          },
        })
      },
})