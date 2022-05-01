Page({
    data:{
        calcWidth: 0,
        calcHeight: 0,
        currentWidth:'',
        currentHeight:'',
        units: [ {
            label: "像素",
            value: "px"
        }, {
            label: "毫米",
            value: "mm"
        } ],
        unit:'',
        selectedUnit: 0,
        pxFormOptions: {
            defaultWidth: 295,
            defaultHeight: 413,
            currentWidth: "",
            currentHeight: "",
            formWidth: 0,
            formHeight: 0,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 1024,
            maxHeight: 1024
        },
        mmFormOptions: {
            defaultWidth: 25,
            defaultHeight: 35,
            currentWidth: "",
            currentHeight: "",
            formWidth: 0,
            formHeight: 0,
            minWidth: 25,
            minHeight: 25,
            maxWidth: 87,
            maxHeight: 87
        },
        currentFormOptions:{
            
        },
        disabled:true,
        imageSrc:'/static/images/background.png'
    },
    onLoad(){
        this.initWidth();
    },
    onReady(){
        
    },
    initWidth(){
        this.setData({
            currentFormOptions:this.data.pxFormOptions,
            currentWidth: this.data.pxFormOptions.defaultWidth + 'px',
            currentHeight: this.data.pxFormOptions.defaultHeight+ 'px',
        })
    },
    onShow(){
        
    },
    imageOnLoad( ){
        this.setData({
            calcWidth:this.data.pxFormOptions.defaultWidth,
            calcHeight:this.data.pxFormOptions.defaultHeight
        })
    },
    clickUnit(e){
        let current =  this.data.currentFormOptions;
        let index = e.detail.index;
        if (index==0) {
            current = this.data.pxFormOptions
        }else{
            current = this.data.mmFormOptions;
        }
        let currentWidth = current.formWidth;
        let currentHeight = current.formHeight;
        let unit = this.data.units[index].value;
        currentWidth = currentWidth || current.defaultWidth;
        currentHeight = currentHeight || current.defaultHeight;
        this.setData({
            selectedUnit: e.detail.index,
            currentFormOptions:current,
            currentWidth:currentWidth+unit,
            currentHeight:currentHeight + unit,
            calcWidth:currentWidth,
            calcHeight:currentHeight,
            unit:unit
        })
        this.enableNextStep();
    },
    inputWidth(e){
        let value = e.detail.value;
        let width = parseFloat(value) || 0;
        let unit = this.data.units[this.data.selectedUnit].value;
        let current =  this.data.currentFormOptions;
        let minWidth = current.minWidth;
        let maxWidth = current.maxWidth;
        if (width<minWidth || width>maxWidth) {
            this.setData({disabled:true})
            return;
        }
        current.formWidth = width;
        this.setData({
            currentFormOptions:current,
            currentWidth:width + unit,
            unit:unit,
            calcWidth:width
        })
        
        this.enableNextStep();
    },
    inputHeight(e){
        let value = e.detail.value;
        let height = parseFloat(value) || 0;
       
        let unit = this.data.units[this.data.selectedUnit].value;
        let current =  this.data.currentFormOptions;
        let minHeight = current.minHeight;
        let maxHeight = current.maxHeight;
        if (height<minHeight || height>maxHeight) {
            this.setData({disabled:true})
            return;
        }
        current.formHeight = height;
        this.setData({
            currentFormOptions:current,
            currentHeight:height + unit,
            unit:unit,
            calcHeight:height
        }) 
        this.enableNextStep();
    },
    enableNextStep(){
        let current =  this.data.currentFormOptions;
        let width = current.formWidth;
        let height = current.formHeight;
        let unit = this.data.units[this.data.selectedUnit].value;
        //console.log(width,height,unit);
        let disabled = true;
        if (width && height && width<= current.maxWidth && width>=current.minWidth &&
            height<=current.maxHeight && height>=current.minHeight) {
            disabled = false;
        }
        this.setData({
            disabled:disabled
        })
    },
    round (t) {
        return Math.round(Math.round(1e4 * t) / 1e4);
    },
    mmToPX(t) {
        return this.round(t / 25.4 * 300);
    },
    pxToMM(t) {
        return this.round(25.4 * t / 300);
    },
    gotoChooseImage(){
        let current =  this.data.currentFormOptions;
        let width = current.formWidth;
        let height = current.formHeight;
        let unit = this.data.units[this.data.selectedUnit].value;
        console.log(unit)
        let photoSize = {
            color:'',
            name:'自定义尺寸'
        }
       
        if(unit=='px'){
            photoSize.pxHeight = height;
            photoSize.pxWidth = width;
            photoSize.mmHeight = this.pxToMM(height);
            photoSize.mmWidth = this.pxToMM(width);
        }else{
            photoSize.mmHeight = height;
            photoSize.mmWidth = width;
            photoSize.pxHeight = this.mmToPX(height);
            photoSize.pxWidth = this.mmToPX(width);
        }
        wx.setStorageSync('photoSize', photoSize);
        wx.navigateTo({
            url: '/pages/choose/index',
        })
    }
})