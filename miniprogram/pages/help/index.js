
Page({
    data:{
        activeName:'1',
    },
    
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
})