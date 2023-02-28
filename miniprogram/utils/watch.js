function observe(obj, key, watchFun, deep, page) {  
    let val = obj[key];  
    if (val != null && typeof val === "object" && deep) {   
         Object.keys(val).forEach((item) => {
            observe(val, item, watchFun, deep, page);
        });
    }  
    Object.defineProperty(obj, key, 
        {    
            configurable: true,    enumerable: true,    
            set: function(value) {
                watchFun.call(page, value, val);
                val = value;      
                if (deep) {
                    observe(obj, key, watchFun, deep, page);
                }
            },    
            get: function() {      
                return val;
            }
        }
    );
}
export function setWatcher(page) {  
    let data = page.data;  
    let watch = page.watch;  
    Object.keys(watch).forEach((item) => {    
        let targetData = data;   
        let keys = item.split(".");   
        for (let i = 0; i < keys.length - 1; i++) {
            targetData = targetData[keys[i]];
        }    
        let targetKey = keys[keys.length - 1];    
        let watchFun = watch[item].handler || watch[item];    
        let deep = watch[item].deep;
        observe(targetData, targetKey, watchFun, deep, page);
    });
}