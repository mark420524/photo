import {
    http,uploadFile,callfunction
  } from 'http.js'
  import CONSTANT from '../utils/constant';
  const imageUrl = CONSTANT.imageUrl;
  var url = {
    imageUpload: imageUrl + "upload",
    imageCompose: imageUrl + "compose"
  }
  module.exports = {
    imageUpload(data){
      let fileName = data.name || 'file';
      let filePath = data.filePath;
      delete data.name;
      return uploadFile({
        url:url.imageUpload,
        data:data,
        name:fileName,
        filePath:filePath,
        method:'POST'
      })
    },
    imageCompose(data){
      return http({
        url: url.imageCompose,
        data: data,
        method: 'POST'
      })
    },
    callfunction:function(data){
      return callfunction(data)
    }
  }