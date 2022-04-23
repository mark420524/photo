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
    }
})