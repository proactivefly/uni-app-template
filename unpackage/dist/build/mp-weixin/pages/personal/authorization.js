(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/authorization"],{1713:function(e,t,n){"use strict";n.r(t);var o=n("2e3e"),a=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=a.a},"2e3e":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("ee25"),a={data:function(){return{select:!0,loginParams:{encryptedData:"",sessionKey:"",iv:"",openId:"",type:""},paramsInfo:{},url:""}},methods:{getPhoneNumber:function(t){var n=this;"getPhoneNumber:ok"==t.detail.errMsg&&(this.loginParams.iv=t.detail.iv,this.loginParams.encryptedData=t.detail.encryptedData,this.request("/user/login",this.loginParams).then((function(t){if(1009==t.resultCode||1006==t.resultCode){var o="",a=t.data;if(a.ticket){var s={value:a.ticket,time:(new Date).getTime(),userType:n.loginParams.type};e.setStorageSync("token",JSON.stringify(s)),e.switchTab({url:"/pages/personal/info"})}else o=1==n.loginParams.type||2==n.loginParams.type?"/pages/staff/login?":"/pages/personal/register?fromType=1",n.perfectNavigateTo({url:o+"&authId=".concat(a.authId,"&mobile=").concat(a.phone,"&userType=").concat(n.loginParams.type)})}else e.showToast({title:t.resultMsg?t.resultMsg:"网络异常，请稍后重试",icon:"none"})})))},checkSession:function(){var t=this;e.checkSession({success:function(){},fail:function(){t.getCode()}})},getCode:function(){var t=this;e.login({success:function(n){n.code?t.request("/auth/getOpenIdAndSessionKey",{authCode:n.code,type:t.loginParams.type}).then((function(n){0==n.resultCode?(t.loginParams.openId=n.data.openId,t.loginParams.sessionKey=n.data.sessionKey):e.showToast({title:n.resultMsg?n.resultMsg:"网络异常,请稍后重试",icon:"none"})})):console.log("微信登录失败！"+n.errMsg)}})},goWeb:function(){var t={url:this.url};e.setStorageSync("webViewInfo",t),this.perfectNavigateTo({url:"/pages/webView/webView"})},getCommon:function(){var e=this;this.request("/common/param",{key:"member_reg_protocol"}).then((function(t){t.data&&(e.url=(0,o.http2Https)(t.data))}))}},onShow:function(){this.checkSession()},onLoad:function(e){this.loginParams.type=e.roleType,this.loginParams.openId=getApp().globalData.openId,this.loginParams.sessionKey=getApp().globalData.sessionKey,this.getCode(),this.getCommon()}};t.default=a}).call(this,n("543d")["default"])},"3de6":function(e,t,n){},7852:function(e,t,n){"use strict";n.r(t);var o=n("ac26"),a=n("1713");for(var s in a)"default"!==s&&function(e){n.d(t,e,(function(){return a[e]}))}(s);n("83df");var i,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=u.exports},"83df":function(e,t,n){"use strict";var o=n("3de6"),a=n.n(o);a.a},a13d:function(e,t,n){"use strict";(function(e){n("f318");o(n("66fd"));var t=o(n("7852"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ac26:function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.select=!e.select})},s=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}))}},[["a13d","common/runtime","common/vendor"]]]);