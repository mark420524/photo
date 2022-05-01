// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    customerSize:{"pxHeight":413,"mmHeight":35,"pxWidth":295,"mmWidth":25,"color":"","name":"自定义尺寸","_id":0,"sort":0,"status":1,"customer":1},
     categoryies:[ 
     ],
     searchVal:''
  },
  onLoad(){
    this.initData()
  },
  initData(){
    let that = this;
    db.collection('photo_size_list')
      .orderBy('sort', 'asc')
      .where({
        status:1
      })
      .get({
        success: function(res) {
          console.log(res.data)
          that.setData({ 
            categoryies:res.data,
          })
        }
      }
      );
  },
  handlerItemClick(e){
    let item = e.currentTarget.dataset.category || {};
    
    let customer = item.customer || 0 ;
    if (customer) {
      wx.navigateTo({
        url: '/pages/size/index',
      })
    }else{
      item.customerBackground=0;
      wx.setStorageSync('photoSize', item);
      wx.navigateTo({
        url: '/pages/choose/index',
      })
    }
  },
  handlerCustomerBackground(){
    let item ={customerBackground:1}
    wx.setStorageSync('photoSize', item);
    wx.navigateTo({
      url: '/pages/choose/index',
    })
  },
  actionSearch( ){
      const keyword = this.selectComponent('#searchText')
      let val = keyword.data.value;
      this.search(val);
  },
  onCofirmSearch(e){
      let val = e.detail;
      this.search(val);
  },
  search(val){

  },
  onShow(){ 
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          active: 0,
        })
      }
  }
})
