Component({
    properties: {
        lineHeight: String,
        currentHeight:String,
        imageWrapStyle:String,
        imageStyle:String,
        imageSrc:String,
        lineWidth:String,
        currentWidth:String
    },
    attached: function() {
    },
    methods: {
        imageOnLoad(e){
            let detail = e.detail;
            this.triggerEvent('imageload', detail);
        },
    }
})