Page({
    data:{
        width: '295px',
        height: '413px',
        lineWidth: 'width:172px;',
        lineHeight: 'width: 237.33333333333334px;',
        imageWrapStyle:'width: 162.38095238095238px;height: 227.33333333333334px;',
         

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
        
          this.setData({
            imageStyle:'flex: 0 0 297.377px;        width: 297.377px;        height: 227.332px;' 
          })
    },
    width(){
        return this.currentFormOptions.formWidth || this.currentFormOptions.defaultWidth;
    },
    height() {
        return this.currentFormOptions.formHeight || this.currentFormOptions.defaultHeight;
    },
    wrapOptions() {
        var t = this.width(), i = this.height();
        "mm" === this.unit() && (t *= this.mmSize, i *= this.mmSize);
        var e = this.imageBoxStyleOptions.imageWrap.maxWidth / this.imageBoxStyleOptions.imageWrap.maxHeight;
        (this.width > this.imageBoxStyleOptions.imageWrap.maxWidth || this.height > this.imageBoxStyleOptions.imageWrap.maxHeight) && (this.ratio > e ? (t = this.imageBoxStyleOptions.imageWrap.maxWidth, 
        i = this.imageBoxStyleOptions.imageWrap.maxWidth / this.ratio) : (i = this.imageBoxStyleOptions.imageWrap.maxHeight, 
        t = this.imageBoxStyleOptions.imageWrap.maxHeight * this.ratio));
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
    }
})