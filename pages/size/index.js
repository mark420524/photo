Page({
    data:{
        width: '',
        height: '',
        lineWidth: '',
        lineHeight: '',
        imageWrapStyle:'',
        currentWidth:0,
        currentHeight:0,
        mmSize: 0,
        imageSize: {
            width: 0,
            height: 0
        },
        viewPort: {},
        units: [ {
            label: "像素",
            value: "px"
        }, {
            label: "毫米",
            value: "mm"
        } ],
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
        imageBoxStyleOptions: {
            imageWrap: {
                maxWidth: "",
                minWidth: "",
                maxHeight: "",
                minHeight: "",
                width: "",
                height: ""
            }
        },
        disabled:true
    },
    onLoad(){
        this.initData();
        this.initWidth();
        this.initStyle();
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
    
    sizeControl: function() {
        return {
            min: {
                width: this.data.currentFormOptions.minWidth,
                height: this.data.currentFormOptions.minHeight
            },
            max: {
                width: this.data.currentFormOptions.maxWidth,
                height: this.data.currentFormOptions.maxHeight
            }
        };
    },
    initData  () {
        var t = this, i = wx.createSelectorQuery();
        i.select(".container").boundingClientRect(), i.select(".image").boundingClientRect(), 
        i.select(".imageWrap").boundingClientRect(),   
        i.selectViewport().boundingClientRect(), i.exec(function(i) {
            var e = i[0];
            i[1], i[2], t.data.mmSize = i[3].width / 100, t.data.viewPort = i[4], t.data.imageBoxStyleOptions.imageWrap.maxWidth = e.width / 3 * 2, 
            t.data.imageBoxStyleOptions.imageWrap.minHeight = t.data.imageBoxStyleOptions.imageWrap.minWidth = 100, 
            t.data.imageBoxStyleOptions.imageWrap.maxHeight = e.height / 3 * 2;
        });
    },
    initStyle(){
        let heightControl = this.heightControlStyles();
        let widthControl = this.widthControlStyles();
        let imageStyle = this.imageStyles();
        let wrapStyles = this.wrapStyles();   
        this.setData({
            imageStyle:imageStyle,
            lineHeight:heightControl,
            lineWidth:widthControl,
            imageWrapStyle:wrapStyles,
        })
    },
    width(){
        return this.data.currentFormOptions.formWidth || this.data.currentFormOptions.defaultWidth;
    },
    height() {
        return this.data.currentFormOptions.formHeight || this.data.currentFormOptions.defaultHeight;
    },
    ratio () {
        return this.width() / this.height();
    },
    wrapOptions() {
        var t = this.width(), i = this.height();
        "mm" === this.unit() && (t *= this.data.mmSize, i *= this.data.mmSize);
        var e = this.data.imageBoxStyleOptions.imageWrap.maxWidth / this.data.imageBoxStyleOptions.imageWrap.maxHeight;
        (this.width() > this.data.imageBoxStyleOptions.imageWrap.maxWidth || this.height() > this.data.imageBoxStyleOptions.imageWrap.maxHeight) && (this.ratio() > e ? (t = this.data.imageBoxStyleOptions.imageWrap.maxWidth, 
        i = this.data.imageBoxStyleOptions.imageWrap.maxWidth / this.ratio()) : (i = this.data.imageBoxStyleOptions.imageWrap.maxHeight, 
        t = this.data.imageBoxStyleOptions.imageWrap.maxHeight * this.ratio()));
        var n = wx.getSystemInfoSync();
        return t > 580 / 750 * n.windowWidth && (t = 580 / 750 * n.windowWidth), i > 580 / 750 * n.windowWidth && (i = 580 / 750 * n.windowWidth), 
        {
            width: t||0,
            height: i||0
        };
    },
    unit() {
        return this.data.units[this.data.selectedUnit].value;
    },
    imageOnLoad(e){
        this.setData({
            imageSize:e.detail
        })
        this.initStyle()
    },
    heightControlStyles () {
        let wrapper = this.wrapOptions();
        return 'width:'+ ( wrapper.height + 10 ) + 'px;' ;
    },
    widthControlStyles () {
        let wrapper = this.wrapOptions();
        return 'width:'+( wrapper.width + 10 ) + 'px;';
    },
    imageStyles () {
        var t = (this.data.imageSize.width / this.data.imageSize.height) || 0;
        let wrapOption = this.wrapOptions();
        return this.ratio() < 25 / 35 ?  'flex: 0 0 ' + (1.7 *  wrapOptions.width) + 'px;'
          : 'flex: 0 0 ' + (wrapOption.height * t) + 'px;'+'width: '+(wrapOption.height * t) + 'px;'
        ;
    },
    wrapStyles: function() {
        let wrapOption = this.wrapOptions();
        return 'width: '+wrapOption.width + 'px;'+ 'height: '+wrapOption.height + 'px;';
        
    },
    clickUnit(e){
        
        let current =  this.data.currentFormOptions;
        let currentWidth = current.formWidth;
        let currentHeight = current.formHeight;
        let index = e.detail.index;
        if (index==0) {
            current = this.data.pxFormOptions
        }else{
            current = this.data.mmFormOptions;
        }
        let unit = this.data.units[index].value;
        currentWidth = currentWidth || current.defaultWidth;
        currentHeight = currentHeight || current.defaultHeight;
        
        this.setData({
            selectedUnit: e.detail.index,
            currentFormOptions:current,
            currentWidth:currentWidth+unit,
            currentHeight:currentHeight + unit
        })
        this.initStyle()
    }
})