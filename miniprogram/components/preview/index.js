Component({
    properties: {
        currentHeight:String,
        imageSrc:String,
        currentWidth:String,
        calcWidth:Number,
        calcHeight:Number, 
        unit: {
            type: String,
            value: 'px'
        },
        background:{
            type:String,
            value:'#438edb'
        }
    },
    data:{
        lineHeight: '',
        imageWrapStyle: '',
        imageStyle: '',
        lineWidth:'',
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
        mmSize: 0,
    },
    lifetimes: {
        attached: function() {
          // 在组件实例进入页面节点树时执行
          this.initData()
        },
    },
    observers:{
        'calcWidth, calcHeight':function(calcWidth,calcHeight){
            if (calcWidth===0 && calcHeight===0) {
                return;
            }
            this.initStyle()
        }

    },
    methods: {
        imageOnLoad(e){
            let detail = e.detail;
            this.setData({
                imageSize: detail
            });
            this.triggerEvent('imageonload',detail)
        },
        initData  () {
            var t = this, i = wx.createSelectorQuery().in( this);
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
            return this.ratio() < 25 / 35 ?  'flex: 0 0 ' + (1.7 *  wrapOption.width) + 'px;'
              : 'flex: 0 0 ' + (wrapOption.height * t) + 'px;'+'width: '+(wrapOption.height * t) + 'px;'
            ;
        },
        wrapStyles: function() {
            let wrapOption = this.wrapOptions();            
            return 'width: '+wrapOption.width + 'px;'+ 'height: '+wrapOption.height + 'px;';
        },
        width(){
            return this.properties.calcWidth
        },
        height() {
            return this.properties.calcHeight;
        },
        unit() {
            return this.properties.unit;
        },
        wrapOptions() {
            var t = this.width(), 
                i = this.height();
                "mm" === this.unit() && (t *= this.data.mmSize, i *= this.data.mmSize);
            var e = this.data.imageBoxStyleOptions.imageWrap.maxWidth / this.data.imageBoxStyleOptions.imageWrap.maxHeight;
            (
                this.width() > this.data.imageBoxStyleOptions.imageWrap.maxWidth || this.height() > this.data.imageBoxStyleOptions.imageWrap.maxHeight
            ) && (
                this.ratio() > e ? 
                    (
                    t = this.data.imageBoxStyleOptions.imageWrap.maxWidth, 
                    i = this.data.imageBoxStyleOptions.imageWrap.maxWidth / this.ratio()
                    ) : (
                        i = this.data.imageBoxStyleOptions.imageWrap.maxHeight, 
                        t = this.data.imageBoxStyleOptions.imageWrap.maxHeight * this.ratio()
                        )
                );
            var n = wx.getSystemInfoSync();
            return t > 580 / 750 * n.windowWidth && (t = 580 / 750 * n.windowWidth), i > 580 / 750 * n.windowWidth && (i = 580 / 750 * n.windowWidth), 
            {
                width: t||0,
                height: i||0
            };
        },
        ratio () {
            return this.width() / this.height();
        },
    }
})