const app = getApp();
const apis = app.apis;
const utils = app.utils;
Page({
    data:{
        rgb: 'rgb(7,193,96)',
        pick: false,
        item:{},
        currentImage:'',
        background:'white',
        showColors:false,
        showTabs:false,
        savePic:true,
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
        color:'white',
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
        let currentHeight = targetHeight || sourceHeight;
        let currentWidth = targetWidth || sourceWidth;
        let showTabs=false;
        let showColors = false;
        let imageSrc = '';
        let savePic = false;
        let imageDomain = item.imageDomain;
        if (targetWidth && targetHeight) {
            showTabs=true;
            imageSrc = item.targetImageCut;
            savePic = true;
        }else{
            showColors = true;
            imageSrc = item.sourceImageNotBack;
        }
        imageSrc = this.buildImageSrc(imageSrc, imageDomain)
        this.setData({
			currentHeight:currentHeight+this.data.unit,
            currentWidth:currentWidth+this.data.unit,
            width:currentWidth,
            height:currentHeight,
            calcWidth:0,
            calcHeight:0, 
            background:'white',
            showColors:showColors,
            showTabs:showTabs,
            currentImage:imageSrc,
            item:item,
            savePic:savePic
		})
    },
    buildImageSrc(imageSrc, imageDomain){
        if(imageSrc.indexOf('http')==0){
            return imageSrc;
        }else{
            return imageDomain+imageSrc;
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
        let index = detail.index;
        let item = this.data.item;
        let currentHeight = '';
        let currentWidth = '';
        let imageSrc = '';
        let imageDomain = item.imageDomain;
        if (index==0) {
            //?????????
            currentHeight = item.targetHeight;
            currentWidth = item.targetWidth;
            imageSrc = item.targetImageCut
        }else{
            //??????
            currentHeight = item.sourceHeight;
            currentWidth = item.sourceWidth;
            imageSrc = item.sourceImage
        }
        imageSrc = this.buildImageSrc(imageSrc, imageDomain)
        this.setData({
            background:'white',
			currentHeight:currentHeight+this.data.unit,
            currentWidth:currentWidth+this.data.unit,
            calcWidth:currentWidth,
            calcHeight:currentHeight,
            currentImage:imageSrc,
		})
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
    },
    savePicToAlbum(){
        let currentImage = this.data.currentImage;
        this.savePicture(currentImage)
    },
    savePicture(currentImage){
        
        let that =  this;
        console.log(currentImage)
        wx.showLoading({
          title: '????????????',
        })
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.writePhotosAlbum']) {
                    //???????????????
                    wx.downloadFile({
                        url: currentImage,  
                        success (res) {
                            if (res.statusCode === 200) {
                                console.log(res.tempFilePath)
                                wx.saveImageToPhotosAlbum({
                                    filePath: img,
                                    success: (result) => {
                                        utils.showWxToast('????????????')
                                    },
                                    fail:(res)=>{
                                        utils.showWxToast('????????????????????????????????????')
                                    }
                                })
                            } else {
                                utils.showWxToast('??????????????????')
                            }
                        },
                        fail (error) {
                            
                            utils.showWxToast('??????????????????')
                        }
                    })
                } else {
                    that.openAuthAlbum()
                }
            },
            fail (res) {
                utils.showWxToast('????????????????????????')
                console.log(res)
            },
            complete( ){
                wx.hideLoading()
            }
        })
    },
    openAuthAlbum(){
        wx.showModal({
          content: '?????????????????????????????????????????????????????????',
          confirmText: "??????",
          cancelText: "??????",
          success: function (res) {
          
          //???????????????????????????????????????
          if (res.confirm) {
            wx.openSetting({
            success: (res) => { }
            })
          } else {
            console.log('??????????????????')
          }
          }
        });
    },
    composeBackground(){
        wx.showLoading({
          title: '???????????????',
        })
        let that = this;
        let color = this.data.color;
        let item = this.data.item;
        let sourceImage = item.sourceImage;
        let filename = sourceImage.split('/')
        filename = filename[filename.length-1]
        let data = {
            sourceImage: filename,
            color:color
        }
        apis.imageCompose(data).then(res=>{
            //console.log(res)
            let imageSrc = res.imageSrc
            that.savePicToAlbum(imageSrc)
            wx.hideLoading()
        })
        
    },
    moreColor () {
        this.setData({
            pick: true
        })
    },
    pickColor(e) {
        let customeStyle=[];
        for (let i=0;i<this.data.colors.length;i++){
            customeStyle[i]='display:none;';
        }
        this.setData({
            customeStyle:customeStyle,
            color:e.detail.color,
            background:e.detail.color
        })
    },
})