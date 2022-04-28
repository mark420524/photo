Page({
    data:{
        item:{},
        currentImage:'/static/images/background.png',
        iamgeBackground:'white',
        targetWidth:'',
        targetHeight:'',
        showScale: 1,
    },
    onLoad(){
        this.setData({
			
			targetWidth: 295,
			targetHeight: 453,
			showScale: (480 / (+295)),
			
		})
    }
})