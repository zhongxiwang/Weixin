// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as filters from './filters'
import router from './router'
import ElementUI from 'element-ui'

import wx from 'weixin-js-sdk'

import 'layui-layer'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'

import sys_dictionary from './dictionary'
let dictionary = sys_dictionary["dictionary"];

//注入自定义过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

const MyGlobal = {
  //
  GetDataAjax(type, urlAfter, params, success, error, async) {
    if (async == undefined) {
      async = true;
    }
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/limit/" + urlAfter,
      type: type,
      async: async,
      data: params,
      success: success,
      error: error
    });
  },
  //用于Ashx接口(分局)
  //urlAfter:Url参数，params:参数，success:成功回调，error:失败回调
  GetDataAshx(urlAfter, params, success, error) {
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/dynamic/GetSubmitFlowInfo?GetPar=" + encodeURIComponent("?" + urlAfter),
      type: "post",
      contentType: "application/json",
      dataType: "json",
      data: "{" + params + "}",
      success: success,
      error: error
    });
  },
  //用于Ashx接口(市局)
  //urlAfter:Url参数，params:参数，success:成功回调，error:失败回调
  GetDataAshxNJSJ(urlAfter, params, success, error) {
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/dynamic/NJSJGetSubmitFlowInfo?GetPar=" + encodeURIComponent("?" + urlAfter),
      type: "post",
      contentType: "application/json",
      dataType: "json",
      data: "{" + params + "}",
      success: success,
      error: error
    });
  },
  //用于DLL及WebService接口(分局)
  //Namespace:命名空间，MethodName:方法名，params:参数，success:成功回调，error:失败回调
  GetDataWebService(Namespace, MethodName, params, success, error) {
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/dynamic/Method",
      type: "post",
      contentType: "application/json",
      data: "{ asb: \"b\", cls: \"" + Namespace + "\", mth: \"" + MethodName + "\", param: \"" + params + "\",rootPath:\"\" }",
      success: success,
      error: error
    });
  },
  //用于DLL及WebService接口(市局)
  //Namespace:命名空间，MethodName:方法名，params:参数，success:成功回调，error:失败回调
  GetDataWebServiceNJSJ(Namespace, MethodName, params, success, error) {
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/dynamic/NJSJMethod",
      type: "post",
      contentType: "application/json",
      data: "{ asb: \"b\", cls: \"" + Namespace + "\", mth: \"" + MethodName + "\", param: \"" + params + "\",rootPath:\"\" }",
      success: success,
      error: error
    });
  },
  //业务提交(分局)
  //iid:公文号，wiid:流程号，flows:流向，users:用户，success:成功回调，error:失败回调
  NetofficeSubmit(iid, wiid, flows, users, success, error) {
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/dynamic/Sumbit",
      //url: "http://192.168.1.2/netofficeweb/FrameWork/Model/Service/NetOfficeService.asmx/Sumbit",
      type: "POST",
      contentType: "application/json",
      data: "{ iid: \"" + iid + "\", wiid: \"" + wiid + "\", flows: \"" + flows + "\", users: \"" + users + "\" }",
      error: error,
      success: success,
    });
  },
  //业务提交(市局)
  //iid:公文号，wiid:流程号，flows:流向，users:用户，success:成功回调，error:失败回调
  NetofficeSubmitNJSJ(iid, wiid, flows, users, success, error) {
    $.ajax({
      url: "http://218.94.36.101:8888/DataBus/api/dynamic/NJSJSumbit",
      //url: "http://192.168.1.2/netofficeweb/FrameWork/Model/Service/NetOfficeService.asmx/Sumbit",
      type: "POST",
      contentType: "application/json",
      data: "{ iid: \"" + iid + "\", wiid: \"" + wiid + "\", flows: \"" + flows + "\", users: \"" + users + "\" }",
      error: error,
      success: success,
    });
  },
};

Vue.prototype.$MyGlobal = MyGlobal;

//获取微信Config
const WxConfig = function () {
  $.ajax({
    url: "http://pd.antu.com.cn:82/Ticket/test?urls=" + window.location.href.split('#')[0],
    type: "get",
    dataType: "json",
  }).then((result) => {
    var json = JSON.parse(result);
    wx.config({
      beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'ww086e61d21d6452c8', // 必填，企业微信的corpID
      timestamp: json["timestamp"], // 必填，生成签名的时间戳
      nonceStr: json["noncestr"], // 必填，生成签名的随机串
      signature: json["Signature"],// 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage',
        'onMenuShareWechat',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'previewFile',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'onHistoryBack',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'selectEnterpriseContact',
        'openEnterpriseChat',
        'chooseInvoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2*/
    });
  }).catch((err) => {
    //layer.alert("获取签名失败！");
  });
};
//WxConfig();
//setInterval(WxConfig(), 3600000);

Vue.prototype.$wx = wx;

Vue.prototype.$UserInfo = {
  userId: "",
  loginName: "",
  mobile: "",
  region: ""
};

//获取用户信息
Vue.prototype.$GetWxUserInfo = function (route) {
  console.log("app: ", app);
  console.log("app: ", app.$route);
  var url = window.location.href;
  var type = route.params.type;
  var code = GetRequest().code;
  console.log(type);

  var programName = dictionary[type]["program_name"];
  console.log("code: ", code);
  console.log("program_name", programName);
  //获取存储在本地的用户信息 Cookie 如果存在则无需再向服务器获取用户信息
  var session = sessionStorage.getItem("userinfo");
  //console.log(session);
  if (session) {
    console.log("session: ", session);
    let userinfo = JSON.parse(session);
    Vue.prototype.$UserInfo.userId = userinfo.userId;
    Vue.prototype.$UserInfo.loginName = userinfo.loginName;
    Vue.prototype.$UserInfo.mobile = userinfo.mobile;
    Vue.prototype.$UserInfo.region = userinfo.region;
    console.log("$UserInfo", Vue.prototype.$UserInfo.userId);
    console.log("$UserInfo", Vue.prototype.$UserInfo.loginName);
    console.log("$UserInfo", Vue.prototype.$UserInfo.mobile);
    console.log("$UserInfo", Vue.prototype.$UserInfo.region);
    return true;
  }
  //Cookie中存有手机号，如果存在手机号则不请求微信接口
  if (localStorage.getItem("mobile") || getCookie("mobile")) {
    console.log("localStorage||Cookie mobile: ", localStorage.getItem("mobile") || getCookie("mobile"));
    Vue.prototype.$UserInfo.mobile = localStorage.getItem("mobile") || getCookie("mobile");
    GetUserInfo(Vue.prototype.$UserInfo.mobile);//获取用户信息
    return false;
  }

  if (code) {
    console.log("code: ", true);
    $.ajax({
      url: "http://pd.antu.com.cn:82/UserTicket/" + programName + "?Code=" + code,
      type: "get",
      async: false,
      success: function (userstr) {
        userstr = JSON.parse(userstr);
        console.log("userstr", userstr);
        $.ajax({
          url: "http://pd.antu.com.cn:82/api/User?userid=" + userstr.UserId,
          type: "get",
          async: false,
          success: function (result) {
            result = JSON.parse(result);
            console.log("result: ", result);
            var mobile = result.mobile;
            localStorage.setItem("mobile", result.mobile);       //记录电话号码
            setCookie("mobile", result.mobile, 1);//记录电话号码
            GetUserInfo(mobile);
          },
          error: function (result) {
            layer.alert("获取用户微信信息失败！");
          }
        })
      },
      error: function (err) {
        layer.alert("获取用户 userid 失败！");
      }
    });
  }
  else {
    layer.alert("获取用户 Code 失败！");
  }
};

//根据当前微信登陆用户手机号获取数据库中对应用户信息
const GetUserInfo = function (mobile) {
  console.log(mobile);
  if (mobile == "15170578192" || mobile == "15279976563" || mobile == "15123210704" || mobile == "15252460644") {
    mobile = "13951723333";
  }
  if (mobile == "15123210704") {
    mobile = "13584071117";
  }

  var AjaxData = {
    type: ["user a"],
    pageNum: 1,
    PageMax: 1,
    fileds: "a.*",
    where: "mobile='" + mobile + "'",
  };
  var urlAfter = AjaxData.type.join(",");
  var success = function (result) {
    if (result.length == 1) {
      var userinfo = result[0];
      Vue.prototype.$UserInfo.userId = userinfo.userid;
      Vue.prototype.$UserInfo.loginName = userinfo.login_name;
      Vue.prototype.$UserInfo.mobile = mobile;
      Vue.prototype.$UserInfo.region = "fj";
      console.log(Vue.prototype.$UserInfo.loginName);

      //储存用户信息 Session
      sessionStorage.setItem("userinfo", JSON.stringify(Vue.prototype.$UserInfo));
      console.log("Vue.prototype.$UserInfo", Vue.prototype.$UserInfo);
    }
    else {
      ClearObtain();  //失败则重新清除电话缓存重新获取微信用户信息
    }
  };
  var error = function (err) {
    layer.alert("获取用户信息时系统发生异常！");
  }

  MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error, false);
}
//根据当前微信登陆用户手机号获取数据库中对应用户信息(市局)
const GetSjUserInfo = function (mobile) {
  if (Vue.prototype.$UserInfo.region == "sj") {
    return false;
  }

  Vue.prototype.$UserInfo.userId = "";
  Vue.prototype.$UserInfo.loginName = "";
  console.log("GetSjUserInfo");
  console.log(mobile);
  if (mobile == "15279976563") {
    mobile = "13951723333";
  }

  var AjaxData = {
    type: ["njuser a"],
    pageNum: 1,
    PageMax: 1,
    fileds: "a.*",
    where: "mobile='" + mobile + "'",
  };
  var urlAfter = AjaxData.type.join(",");
  var success = function (result) {
    if (result.length == 1) {
      var userinfo = result[0];
      Vue.prototype.$UserInfo.userId = userinfo.userid;
      Vue.prototype.$UserInfo.loginName = userinfo.login_name;
      Vue.prototype.$UserInfo.region = "sj";
      console.log(JSON.stringify(Vue.prototype.$UserInfo));

      //储存用户信息 Session
      sessionStorage.setItem("userinfo", JSON.stringify(Vue.prototype.$UserInfo));
      console.log("Vue.prototype.$UserInfo", Vue.prototype.$UserInfo);
    }
    else {
      layer.alert("不存在该用户！");
    }
  };
  var error = function (err) {
    layer.alert("获取用户信息时系统发生异常！");
  }

  MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error, false);
}
Vue.prototype.$GetUserInfo = GetUserInfo;
Vue.prototype.$GetSjUserInfo = GetSjUserInfo;

//当前缓存中的手机号获取用户失败则清除缓存重新获取手机号
function ClearObtain() {
  if (localStorage.getItem("mobile") || getCookie("mobile")) {
    localStorage.clear();     //清除缓存
    setCookie("mobile", "", 1);

    //获取重新获取用户微信信息
    Vue.prototype.$GetWxUserInfo(app.route);
  }
}

function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串  
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


//JS操作cookies方法!
//写cookies
function setCookie(name, value, Days) {
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}


// wx.ready(function () {
//   console.log("成功！");

//   wx.previewFile({
//     url: 'http://c.hiphotos.baidu.com/image/pic/item/b03533fa828ba61e320cf6a04d34970a314e595a.jpg?filename=b03533fa828ba61e320cf6a04d34970a314e595a.jpg', // 需要预览文件的地址(必填，可以使用相对路径)
//     name: 'b03533fa828ba61e320cf6a04d34970a314e595a.jpg', // 需要预览文件的文件名(不填的话取url的最后部分)
//     size: 1024 // 需要预览文件的字节大小(必填)
//   });
// });

// wx.error(function (res) {
//   alert("失败！");
// });