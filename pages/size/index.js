import * as watch from "../../utils/watch.js";
Page({
    data:{
        width: '295px',
        height: '413px',
        lineWidth: 'width:172px;',
        lineHeight: 'width: 237.33333333333334px;',
        imageWrapStyle:'width: 162.38095238095238px;height: 227.33333333333334px;',
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
            defaultWidth: 295,
            defaultHeight: 413,
            currentWidth: "",
            currentHeight: "",
            formWidth: 0,
            formHeight: 0,
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
        animationData:''

    },
    onLoad(){
        watch.setWatcher(this);
        this.initData();
        this.initStyle();
        this.initWidth();
        
    },
    onReady(){
        
    },
    initWidth(){
        this.setData({
            currentWidth:this.width(),
            currentHeight:this.height()
        })
    },
    onShow(){
        
    },
    watch: {    
        currentWidth: function(t) {
            /*
            var i = Number(t);
            i >= this.sizeControl().max.width ? this.formWidth = this.currentWidth = this.formWidth = this.sizeControl.max.width : i >= this.sizeControl().min.width && (this.formWidth = this.currentWidth = Number(i));
            */
           console.log('currentWidth',t)
           this.initStyle();
        },
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
            t.setData({
                mmSize: i[3].width / 100
            })
            console.log('t.data.mmSize',t.data.mmSize)
            
        });
    },
    initStyle(){
        let heightControl = this.heightControlStyles();
        let widthControl = this.widthControlStyles();
        let imageStyle = this.imageStyles();
        let wrapStyles = this.wrapStyles();
        console.log(heightControl,widthControl,imageStyle,wrapStyles)
        let test = 'flex: 0 0 297.377px;        width: 297.377px;        height: 227.332px;' ;
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
        console.log(this.data.mmSize)
        var t = this.width(), i = this.height();
        "mm" === this.unit() && (t *= this.data.mmSize, i *= this.data.mmSize);
        var e = this.data.imageBoxStyleOptions.imageWrap.maxWidth / this.data.imageBoxStyleOptions.imageWrap.maxHeight;
        (this.width() > this.data.imageBoxStyleOptions.imageWrap.maxWidth || this.height() > this.data.imageBoxStyleOptions.imageWrap.maxHeight) && (this.ratio() > e ? (t = this.data.imageBoxStyleOptions.imageWrap.maxWidth, 
        i = this.data.imageBoxStyleOptions.imageWrap.maxWidth / this.ratio()) : (i = this.data.imageBoxStyleOptions.imageWrap.maxHeight, 
        t = this.data.imageBoxStyleOptions.imageWrap.maxHeight * this.ratio()));
        var n = wx.getSystemInfoSync();
        return t > 580 / 750 * n.windowWidth && (t = 580 / 750 * n.windowWidth), i > 580 / 750 * n.windowWidth && (i = 580 / 750 * n.windowWidth), 
        {
            width: t,
            height: i
        };
    },
    unit() {
        return this.data.units[this.data.selectedUnit].value;
    },
    imageOnLoad(e){
        
        this.setData({
            imageSize:e.detail
        })
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
        var t = this.data.imageSize.width / this.data.imageSize.height;
        console.log(t)
        let wrapOption = this.wrapOptions();
        console.log(this.ratio() < 25 / 35,wrapOption)
        return this.ratio() < 25 / 35 ?  'flex: 0 0 ' + (1.7 *  wrapOptions.width) + 'px;'
          : 'flex: 0 0 ' + (wrapOption.height * t) + 'px;'+'width: '+(wrapOption.height * t) + 'px;'
        ;
    },
    wrapStyles: function() {
        let wrapOption = this.wrapOptions();
        return 'width: '+wrapOption.width + 'px;'+ 'height: '+wrapOption.height + 'px;';
        
    },
})