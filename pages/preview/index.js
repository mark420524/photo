Page({
    data:{
        item:{},
        currentImage:'/static/images/background.png',
        background:'white',
        
        currentHeight:0,
        currentWidth:0,
        calcWidth:0,
        calcHeight:0,
        showScale: 1,
        unit:'px'
    },
    onLoad(){
        let width = 295;
        let height = 413;
        this.setData({
			currentHeight:height+this.data.unit,
            currentWidth:width+this.data.unit,
            calcWidth:0,
            calcHeight:0, 
			background:'red'
		})
    },
    imageOnLoad( ){
        let width = 295;
        let height = 413;
        this.setData({
            calcWidth:width,
            calcHeight:height
        })
    },
})