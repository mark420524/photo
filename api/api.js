import {
    http,uploadFile
  } from 'http.js'
  import CONSTANT from '../utils/constant';
  const apiUrl=CONSTANT.apiUrl; //服务器api地址
  const imageUrl = CONSTANT.imageUrl;
  var url = {
    userLogin: apiUrl+ "v2/user/login",
    imageUpload: imageUrl + "upload"
  }
  module.exports = {
    userLogin(data) {
      let appId = data.appId;
      delete data.appId;
      return http({
        url: url.userLogin+'/'+appId,
        data: data,
        method: 'POST'
      })
    },
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
    }
  }