import {
    http
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
      return http({
        url:url.imageUpload,
        data:data,
        method:'POST'
      })
    }
  }