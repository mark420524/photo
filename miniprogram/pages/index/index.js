// index.js
// 获取应用实例
const app = getApp()
const utils = app.utils;
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
    this.search();
  },
  search(val){
    let that = this;
    wx.showLoading({
      title: '查询数据中',
    })
    let params = {
      status:1,
    }
    if (val){
      params.name = db.RegExp({
        regexp: val,
        options: 'i',
      })
    }
    
    let data = {
      dbname:'photo_size_list',
      params:params,
      sort:'sort',
      rule:'asc'
    }
    wx.cloud.callFunction({
      name: "querydata",
      data:data
    }).then(res=>{
        console.log(res)
        let result = res.result;
        wx.hideLoading()
        if (result.data  && result.data.length>0) {
            that.setData({
              categoryies:result.data
            })
        }else{
            utils.showWxToast('查无数据');
        }
        
      }).catch(err=>{
          wx.hideLoading()
          utils.showWxToast('查无数据');
      });
    
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
    let item ={customerBackground:1,name:'自定义背景'}
    wx.setStorageSync('photoSize', item);
    wx.navigateTo({
      url: '/pages/choose/index',
    })
  },
  actionSearch( ){
      const keyword = this.selectComponent('#searchText')
      let val = keyword.data.value;
      if (val) {
        this.search(val);
      }
      
  },
  onCofirmSearch(e){
      let val = e.detail;
      if (val) {
        this.search(val);
      }
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
