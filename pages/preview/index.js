const app = getApp();
Page({
    data:{
        item:{},
        currentImage:'',
        background:'white',
        showColors:false,
        showTabs:false,
        active:0,
        currentHeight:0,
        currentWidth:0,
        calcWidth:0,
        calcHeight:0,
        width:0,
        height:0,
        showScale: 1,
        unit:'px',
        colors:[
            {name:'white',color:'white'},
            {name:'red',color:'red'},
            {name:'blue1',color:'#438edb'},
            {name:'blue2',color:'#00bff3'},
        ],
        color:'',
        customeStyle:[
            'display:none;',
            'display:none;',
            'display:none;',
            'display:none;'
        ]
    },
    onLoad(){
        this.initData();
    },
    initData(){
        let item = wx.getStorageSync('previewImage');
        let targetWidth = item.targetWidth
        let targetHeight = item.targetHeight;
        let sourceWidth = item.sourceWidth;
        let sourceHeight = item.sourceHeight;
        let currentHeight = targetHeight || sourceHeight
        let currentWidth = targetWidth || sourceWidth;
        let showTabs=false;
        let showColors = false;
        let imageSrc = '';

        if (targetWidth && targetHeight) {
            showTabs=true;
            imageSrc = item.targetImageCut;
        }else{
            showColors = true;
            imageSrc = item.sourceImageNotBack;
        }
        imageSrc = this.buildImageSrc(imageSrc)
        this.setData({
			currentHeight:currentHeight+this.data.unit,
            currentWidth:currentWidth+this.data.unit,
            width:currentWidth,
            height:currentHeight,
            calcWidth:0,
            calcHeight:0, 
            background:'red',
            showColors:showColors,
            showTabs:showTabs,
            currentImage:imageSrc
		})
    },
    buildImageSrc(imageSrc){
        if(imageSrc.indexOf('http')==0){
            return imageSrc;
        }else{
            return app.CONSTANT.imageUrl+imageSrc;
        }
    },
    imageOnLoad( ){
        this.setData({
            calcWidth:this.data.width,
            calcHeight:this.data.height
        })
    },
    selectType(e){
        let detail = e.detail;
        console.log(detail)
    },
    changeBackground(e){
        let dataset = e.currentTarget.dataset;
        let color = dataset.color;
        let index = dataset.index;
        let customeStyle=[];
        for (let i=0;i<this.data.colors.length;i++){
            customeStyle[i]='display:none;';
        }
        customeStyle[index]='';
        this.setData({
            customeStyle:customeStyle,
            color:color,
            background:color
        })
    }
})