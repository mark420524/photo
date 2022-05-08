
const app = getApp();
const apis = app.apis;
Page({
    data:{
      toolsItems:[]
    },
    onLoad(){
      this.initData();
    },
    initData(){
      let that = this;
      let data = {
        dbname:'tools_list',
        params:{
          status:1
        },
        sort:'sort',
        rule:'asc',
        functionName:'querydata'
      }
      apis.callfunction(data).then(res=>{
        wx.hideLoading( )
        that.setData({
          toolsItems:res 
        })
      }) 
      
    },
    handlerItemClick(e){
      let dataset = e.currentTarget.dataset;
      wx.navigateToMiniProgram({
        appId: dataset.appid,
        path:  dataset.path,
        success:function(res){
            console.log(res)
        },
        fail:function(res){
            console.log(res)
        }
    })
    }
    
})