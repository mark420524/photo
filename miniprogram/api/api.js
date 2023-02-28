import {
    http,uploadFile 
  } from 'http.js'
  import CONSTANT from '../utils/constant';
  const imageUrl = CONSTANT.imageUrl;
  var url = {
    imageUpload: imageUrl + "upload",
    imageCompose: imageUrl + "compose",
    photoSizeList: imageUrl + "photo/size",
    otherAppInfo: imageUrl + "other/info"
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
    photoSizeList(data){
      return http({
        url:url.photoSizeList,
        data:data,
        method:'GET'
      })
    },
    otherAppInfo(){
      return http({
        url:url.otherAppInfo,
        method:'GET'
      })
    }
  }