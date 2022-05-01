// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        list: [
          {
            pagePath: "/pages/index/index",
            iconPath: "home-o",
            selectedIconPath: "home-o",
            text: "首页"
          },
          
          {
            pagePath: "/pages/my/index",
            iconPath: "contact",
            selectedIconPath: "contact",
            text: "我的"
          }
        ]
    },

    onChange(event) {
        
        const detail = event.detail;
        this.setData({ active: detail });
        const url = this.data.list[detail].pagePath;
        wx.switchTab({url})
        
    }
})