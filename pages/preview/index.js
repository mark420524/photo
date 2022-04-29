Page({
    data:{
        item:{},
        currentImage:'/static/images/background.png',
        background:'white',
        active:0,
        currentHeight:0,
        currentWidth:0,
        calcWidth:0,
        calcHeight:0,
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